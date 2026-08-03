import type { Cama, EstadoCama } from "@/types/triage";
import type { NandaDiagnosis, Prioridad } from "@/types/nanda";
import { findMatchingDiagnoses, normalizeText, sortByPriority } from "./nandaEngine";

const PRIORITY_TO_ESTADO: Record<Prioridad, EstadoCama> = {
  Alta: "rojo",
  Media: "naranja",
  Baja: "verde",
};

type BedAssessmentUpdate = Partial<Pick<Cama, "ia" | "nanda" | "estado">>;

/**
 * Analiza el texto de valoración ingresado para una cama contra el catálogo
 * NANDA y arma la actualización automática de alertas + estado del piso.
 * Si no hay coincidencias, solo actualiza el texto y deja estado/nanda como estaban.
 */
export function buildBedAssessmentUpdate(
  assessmentText: string,
  diagnoses: NandaDiagnosis[],
): BedAssessmentUpdate {
  const trimmed = assessmentText.trim();
  if (!trimmed) return {};

  const cleanText = normalizeText(trimmed);
  const matches = sortByPriority(findMatchingDiagnoses(diagnoses, cleanText), cleanText);

  if (!matches.length) {
    return { ia: trimmed };
  }

  const nanda = matches.map((d) => `${d.codigo} ${d.diagnostico}`);
  const evolutionLines = matches
    .slice(0, 3)
    .map((d) => d.evolucion_es)
    .filter(Boolean);
  const ia = evolutionLines.length
    ? `${trimmed}\n\n— Evolución automática —\n${evolutionLines.join("\n")}`
    : trimmed;

  return { ia, nanda, estado: PRIORITY_TO_ESTADO[matches[0].prioridad] };
}
