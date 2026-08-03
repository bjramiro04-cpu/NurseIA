export type Prioridad = "Alta" | "Media" | "Baja";

export type Abcde =
  | "A-B"
  | "B-C"
  | "C"
  | "C-D"
  | "C-E"
  | "C-D-E"
  | "D"
  | "D-E"
  | "E";

export interface NandaDiagnosis {
  diagnostico: string;
  codigo: string;
  dominio: string;
  prioridad: Prioridad;
  abcde: Abcde;
  palabras_clave: string[];
  rc: string;
  mp: string;
  evolucion_es: string;
  evolucion_en: string;
}
