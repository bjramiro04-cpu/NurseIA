import type { Abcde, Prioridad } from "./nanda";

export interface PatientInfo {
  nombre: string;
  edad: string;
  cama: string;
}

/**
 * Diagnóstico NANDA identificado por la IA (consultando el catálogo NANDA-I
 * real vía url_context), no por matching local contra un catálogo mock.
 */
export interface AiNandaDiagnosis {
  diagnostico: string;
  codigo: string;
  dominio: string;
  prioridad: Prioridad;
  abcde: Abcde;
  rc: string;
  mp: string;
  matchPercent: number;
}
