/**
 * Normaliza un string para comparación clínica: quita acentos, pasa a
 * minúsculas y reemplaza puntuación variable (: / . , ( ) [ ]) por espacios,
 * para tolerar la escritura rápida del piso (ej. "TA:180/100" → "ta 180 100").
 */
export function normalizeText(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[:%/\-.,()[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Verifica si una keyword está presente en el texto clínico ya normalizado.
 * Primero intenta una búsqueda directa; si la keyword tiene varios tokens,
 * también acepta que aparezcan todos en cualquier orden (tolerante a
 * puntuación entre ellos, ej. keyword "TA 180 100" matchea "TA: 180/100").
 */
export function keywordMatches(keyword: string, normalizedText: string): boolean {
  const normKw = normalizeText(keyword);

  if (normalizedText.includes(normKw)) return true;

  const kwTokens = normKw.split(" ").filter((t) => t.length > 0);
  if (kwTokens.length <= 1) return false;

  return kwTokens.every((token) => {
    if (/^\d+$/.test(token)) {
      return new RegExp(`\\b${token}\\b`).test(normalizedText);
    }
    return normalizedText.includes(token);
  });
}

/** Convierte markdown básico (negrita + saltos de línea) a HTML para el chat. */
export function markdownToHtml(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}
