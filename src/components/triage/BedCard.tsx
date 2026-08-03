"use client";

import clsx from "clsx";
import type { Cama } from "@/types/triage";
import { estadoStyle } from "@/services/triageStyles";
import { useTriageStore } from "@/hooks/useTriageStore";

export default function BedCard({ cama }: { cama: Cama }) {
  const selectCama = useTriageStore((s) => s.selectCama);
  const selectedCamaId = useTriageStore((s) => s.selectedCamaId);
  const { camaClass, dotClass } = estadoStyle(cama.estado);
  const isVacia = cama.estado === "vacia" || !cama.nombre;

  return (
    <div
      onClick={() => !isVacia && selectCama(cama.id)}
      className={clsx(
        "cama flex items-center gap-2 p-2.5",
        camaClass,
        isVacia && "opacity-60",
        selectedCamaId === cama.id && "selected",
      )}
    >
      <span className={clsx("h-2.5 w-2.5 flex-shrink-0 rounded-full", dotClass)} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
          {cama.nombre || "Vacía"}
        </p>
        {cama.edad ? <p className="text-xs text-slate-500">{cama.edad} años</p> : null}
      </div>
    </div>
  );
}
