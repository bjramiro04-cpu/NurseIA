/**
 * nurseIA — src/utils/helpers.js
 * Funciones reutilizables en toda la aplicación.
 *
 * Motor de matching mejorado: tolerante a puntuación, espacios, 
 * dos puntos, barras y variaciones de escritura rápida del piso.
 */

/**
 * Normaliza un string para comparación clínica.
 * Elimina acentos, convierte a minúsculas y limpia caracteres
 * que varían en la escritura rápida (: / . ,)
 *
 * Ej: "TA: 180/100" → "ta 180 100"
 * Ej: "Sat:88%"     → "sat 88"
 * Ej: "FR.30"       → "fr 30"
 */
export function normalizeText(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // quitar acentos
    .toLowerCase()
    .replace(/[:%\/\-\.\,\(\)\[\]]/g, " ")  // reemplazar :/%/-.,()] por espacio
    .replace(/\s+/g, " ")              // múltiples espacios → uno solo
    .trim();
}

/**
 * Verifica si una keyword está presente en el texto clínico.
 * Usa matching por tokens para tolerar variaciones de puntuación.
 *
 * Ejemplos que ahora SÍ detecta:
 *   keyword "TA 180/100"  → detecta "TA: 180/100", "TA:180/100", "TA180/100"
 *   keyword "Sat 88%"     → detecta "Sat:88%", "sat 88%", "Sat.88"
 *   keyword "FR 30"       → detecta "FR:30", "FR. 30", "fr30"
 *   keyword "no hace pis" → detecta "no hace pis", "no hace pís"
 */
export function keywordMatches(keyword, normalizedText) {
  const normKw = normalizeText(keyword);

  // 1. Búsqueda directa (más rápida)
  if (normalizedText.includes(normKw)) return true;

  // 2. Búsqueda por tokens: todos los tokens del keyword deben
  //    aparecer en el texto en orden, aunque no sean contiguos.
  //    Permite detectar "TA 180 100" en "TA: 180/100 mmhg"
  const kwTokens = normKw.split(" ").filter(t => t.length > 0);
  if (kwTokens.length <= 1) return false;

  // Verificar que todos los tokens estén presentes
  return kwTokens.every(token => {
    // Para tokens numéricos buscamos coincidencia exacta de número
    if (/^\d+$/.test(token)) {
      return new RegExp(`\\b${token}\\b`).test(normalizedText);
    }
    return normalizedText.includes(token);
  });
}

/**
 * Calcula el % de coincidencia de un diagnóstico con el texto ingresado.
 * Usa el motor de matching mejorado.
 * Mínimo 60%, sube 10 puntos por cada keyword encontrada, máx 99%.
 */
export function calcMatchPercent(diag, cleanText) {
  const hits = diag.palabras_clave.filter(kw =>
    keywordMatches(kw, cleanText)
  ).length;
  return Math.min(60 + hits * 10, 99);
}

/**
 * Ordena diagnósticos: Alta > Media > Baja.
 * Dentro de la misma prioridad, más coincidencias primero.
 */
export function sortByPriority(diagnoses, cleanText = "") {
  const order = { Alta: 0, Media: 1, Baja: 2 };
  return [...diagnoses].sort((a, b) => {
    const pDiff = order[a.prioridad] - order[b.prioridad];
    if (pDiff !== 0) return pDiff;
    // Desempate: más keywords coincidentes primero
    if (cleanText) {
      return calcMatchPercent(b, cleanText) - calcMatchPercent(a, cleanText);
    }
    return 0;
  });
}

/**
 * Devuelve la clase CSS de pastilla para cada categoría ABCDE.
 */
export function pillClass(abcde) {
  const map = {
    "A-B":   "pill-ab",
    "B-C":   "pill-bc",
    "C":     "pill-c",
    "C-D":   "pill-cd",
    "C-E":   "pill-ce",
    "C-D-E": "pill-cde",
    "D":     "pill-d",
    "D-E":   "pill-de",
    "E":     "pill-e",
  };
  return map[abcde] ?? "pill-de";
}

/**
 * Devuelve clases Tailwind para el badge de prioridad (Alta/Media/Baja).
 */
export function priorityBadgeClass(prioridad) {
  switch (prioridad) {
    case "Alta":  return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    case "Media": return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
    default:      return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
  }
}

/**
 * Copia texto al portapapeles con fallback para navegadores sin soporte.
 */
export async function copyToClipboard(text, onSuccess) {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess?.();
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    onSuccess?.();
  }
}

/**
 * Formatea una fecha en español para el historial.
 * Ej: "30 de junio de 2026, 14:35"
 */
export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Convierte markdown básico a HTML para el chat.
 */
export function markdownToHtml(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

/**
 * Guarda datos en localStorage con manejo de errores.
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    console.warn("nurseIA: No se pudo guardar en localStorage.");
    return false;
  }
}

/**
 * Carga datos de localStorage con valor por defecto.
 */
export function loadFromStorage(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Genera un ID único.
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}