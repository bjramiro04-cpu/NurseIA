/**
 * nurseIA — src/utils/helpers.js
 * Funciones reutilizables en toda la aplicación
 */

/**
 * Elimina acentos y normaliza un string para comparación clínica.
 * Ej: "disnéa" → "disnea"
 */
export function normalizeText(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
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
 * Calcula el % de coincidencia de un diagnóstico con el texto ingresado.
 * Mínimo 60%, sube 12 puntos por cada keyword encontrada, máx 99%.
 */
export function calcMatchPercent(diag, cleanText) {
  const hits = diag.palabras_clave.filter(kw =>
    cleanText.includes(normalizeText(kw))
  ).length;
  return Math.min(60 + hits * 12, 99);
}

/**
 * Ordena diagnósticos: Alta > Media > Baja.
 */
export function sortByPriority(diagnoses) {
  const order = { Alta: 0, Media: 1, Baja: 2 };
  return [...diagnoses].sort((a, b) => order[a.prioridad] - order[b.prioridad]);
}

/**
 * Copia texto al portapapeles y ejecuta un callback de feedback visual.
 */
export async function copyToClipboard(text, onSuccess) {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess?.();
  } catch {
    // Fallback para navegadores sin soporte
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
 * Formatea una fecha en español para mostrar en el historial.
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
 * Convierte markdown básico (**bold** y saltos de línea) a HTML.
 * Usado para renderizar respuestas del chat.
 */
export function markdownToHtml(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

/**
 * Persiste datos en localStorage con manejo de errores.
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
 * Carga datos de localStorage con un valor por defecto.
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
 * Genera un ID único basado en timestamp + random.
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}