import type { EstadoCama } from "@/types/triage";

interface EstadoStyle {
  camaClass: string;
  dotClass: string;
  badge: string;
  badgeClass: string;
}

const ESTADO_STYLES: Record<EstadoCama, EstadoStyle> = {
  rojo: {
    camaClass: "cama-rojo",
    dotClass: "bg-red-500",
    badge: "CRÍTICO",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  naranja: {
    camaClass: "cama-naranja",
    dotClass: "bg-orange-500",
    badge: "ALERTA",
    badgeClass: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  verde: {
    camaClass: "cama-verde",
    dotClass: "bg-green-500",
    badge: "ESTABLE",
    badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  vacia: {
    camaClass: "cama-vacia",
    dotClass: "bg-slate-300",
    badge: "VACÍA",
    badgeClass: "bg-slate-100 text-slate-500",
  },
};

export function estadoStyle(estado: EstadoCama): EstadoStyle {
  return ESTADO_STYLES[estado];
}
