"use client";

import clsx from "clsx";
import { useTriageStore } from "@/hooks/useTriageStore";
import BedCard from "./BedCard";

function LegendItem({ colorClass, dashed, label }: { colorClass?: string; dashed?: boolean; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={clsx(
          "inline-block h-3 w-3 rounded-sm",
          dashed ? "border-2 border-dashed border-slate-300" : `border ${colorClass}`,
        )}
      />
      {label}
    </span>
  );
}

export default function TriageMap() {
  const rooms = useTriageStore((s) => s.rooms);
  const floorName = useTriageStore((s) => s.floorName);

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-brand-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {floorName}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <LegendItem colorClass="bg-red-200 border-red-400" label="Crítico" />
          <LegendItem colorClass="bg-orange-100 border-orange-400" label="Alerta" />
          <LegendItem colorClass="bg-green-100 border-green-400" label="Estable" />
          <LegendItem dashed label="Vacía" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Hab. {room.hab}
            </p>
            <div className="space-y-2">
              {room.camas.map((cama) => (
                <BedCard key={cama.id} cama={cama} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
