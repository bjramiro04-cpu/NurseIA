import type { NandaDiagnosis } from "./nanda";

export interface PatientInfo {
  nombre: string;
  edad: string;
  cama: string;
}

export interface AnalysisResult {
  sorted: NandaDiagnosis[];
  rawText: string;
  cleanText: string;
  evolucionTexto: string;
}
