import type { Abcde, NandaDiagnosis, Prioridad } from "@/types/nanda";
import { keywordMatches, normalizeText } from "./text";

/** Filtra el catálogo NANDA a los diagnósticos cuyas keywords aparecen en el texto. */
export function findMatchingDiagnoses(
  diagnoses: NandaDiagnosis[],
  cleanText: string,
): NandaDiagnosis[] {
  return diagnoses.filter((d) =>
    d.palabras_clave.some((kw) => keywordMatches(kw, cleanText)),
  );
}

/**
 * Calcula el % de coincidencia de un diagnóstico con el texto ingresado.
 * Mínimo 60%, sube 10 puntos por cada keyword encontrada, máximo 99%.
 */
export function calcMatchPercent(diag: NandaDiagnosis, cleanText: string): number {
  const hits = diag.palabras_clave.filter((kw) => keywordMatches(kw, cleanText)).length;
  return Math.min(60 + hits * 10, 99);
}

const PRIORITY_ORDER: Record<Prioridad, number> = { Alta: 0, Media: 1, Baja: 2 };

/** Ordena diagnósticos: Alta > Media > Baja; dentro de la misma prioridad, más coincidencias primero. */
export function sortByPriority(
  diagnoses: NandaDiagnosis[],
  cleanText = "",
): NandaDiagnosis[] {
  return [...diagnoses].sort((a, b) => {
    const pDiff = PRIORITY_ORDER[a.prioridad] - PRIORITY_ORDER[b.prioridad];
    if (pDiff !== 0) return pDiff;
    if (cleanText) {
      return calcMatchPercent(b, cleanText) - calcMatchPercent(a, cleanText);
    }
    return 0;
  });
}

const PILL_CLASS: Record<Abcde, string> = {
  "A-B": "pill-ab",
  "B-C": "pill-bc",
  C: "pill-c",
  "C-D": "pill-cd",
  "C-E": "pill-ce",
  "C-D-E": "pill-cde",
  D: "pill-d",
  "D-E": "pill-de",
  E: "pill-e",
};

/** Clase CSS de pastilla para cada categoría ABCDE. */
export function pillClass(abcde: Abcde): string {
  return PILL_CLASS[abcde] ?? "pill-de";
}

/** Clases Tailwind para el badge de prioridad (Alta/Media/Baja). */
export function priorityBadgeClass(prioridad: Prioridad): string {
  switch (prioridad) {
    case "Alta":
      return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    case "Media":
      return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
    default:
      return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
  }
}

export type AbcdeAlertCategory = "A-B" | "C" | "D";

export interface AbcdeAlert {
  category: AbcdeAlertCategory;
  message: string;
}

const ABCDE_ALERT_MESSAGES: Record<AbcdeAlertCategory, string> = {
  "A-B": "Compromiso respiratorio crítico. Evaluar saturación y patrón ventilatorio de forma inmediata.",
  C: "Compromiso hemodinámico detectado. Controlar PA, perfusión y signos de shock.",
  D: "Alteración neurológica aguda. Evaluar escala de Glasgow y estado de conciencia.",
};

/** Determina si hay una alerta ABCDE crítica entre los diagnósticos de alta prioridad. */
export function detectAbcdeAlert(sorted: { abcde: Abcde; prioridad: Prioridad }[]): AbcdeAlert | null {
  const isAB = sorted.some((d) => ["A-B", "B-C"].includes(d.abcde) && d.prioridad === "Alta");
  const isC = sorted.some(
    (d) => ["C", "C-D", "C-E", "C-D-E"].includes(d.abcde) && d.prioridad === "Alta",
  );
  const isD = sorted.some((d) => d.abcde === "D" && d.prioridad === "Alta");

  const category: AbcdeAlertCategory | null = isAB ? "A-B" : isC ? "C" : isD ? "D" : null;
  if (!category) return null;

  return { category, message: ABCDE_ALERT_MESSAGES[category] };
}

export { normalizeText };
