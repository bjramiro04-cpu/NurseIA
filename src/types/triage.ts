export type EstadoCama = "rojo" | "naranja" | "verde" | "vacia";

export interface Cama {
  id: string;
  nombre: string;
  estado: EstadoCama;
  edad: number | null;
  dx: string;
  ia: string;
  nota: string;
  nanda: string[];
}

export interface Habitacion {
  id: string;
  hab: string;
  camas: Cama[];
}
