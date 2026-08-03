/** Formatea una fecha en español para el historial. Ej: "30 de junio de 2026, 14:35". */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
