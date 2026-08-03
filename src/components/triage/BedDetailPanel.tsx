"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTriageStore } from "@/hooks/useTriageStore";
import { estadoStyle } from "@/services/triageStyles";
import { CloseIcon, EditIcon } from "@/components/icons/Icons";

export default function BedDetailPanel({ onEdit }: { onEdit: () => void }) {
  const selectedCamaId = useTriageStore((s) => s.selectedCamaId);
  const findCama = useTriageStore((s) => s.findCama);
  const closeCamaDetail = useTriageStore((s) => s.closeCamaDetail);
  const saveNota = useTriageStore((s) => s.saveNota);
  const cama = selectedCamaId ? findCama(selectedCamaId) : null;

  const [nota, setNota] = useState("");
  useEffect(() => {
    setNota(cama?.nota ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cama?.id]);

  if (!cama) return null;
  const { dotClass, badge, badgeClass } = estadoStyle(cama.estado);

  const handleSaveNota = () => {
    const trimmed = nota.trim();
    if (!trimmed) return;
    saveNota(trimmed);
    toast.success("Nota guardada para el próximo turno ✓");
  };

  return (
    <div className="mx-auto max-w-4xl animate-slide-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-brand-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 dark:border-slate-800">
        <span className={`h-3 w-3 flex-shrink-0 rounded-full ${dotClass}`} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
            {cama.nombre} — Cama {cama.id}
          </p>
          <p className="text-xs text-slate-500">
            {cama.dx || "Sin diagnóstico"}
            {cama.edad ? ` · ${cama.edad} años` : ""}
          </p>
        </div>
        <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${badgeClass}`}>{badge}</span>
        <button
          onClick={onEdit}
          title="Editar paciente"
          className="flex-shrink-0 p-1 text-slate-400 transition-colors hover:text-violet-600"
        >
          <EditIcon className="h-4 w-4" />
        </button>
        <button
          onClick={closeCamaDetail}
          className="flex-shrink-0 p-1 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Resumen IA del turno anterior
          </p>
          <p className="rounded-xl border border-slate-100 bg-brand-50 p-3 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            {cama.ia || "Sin resumen del turno anterior."}
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Alertas NANDA
          </p>
          <div className="space-y-1.5">
            {cama.nanda.length ? (
              cama.nanda.map((n) => (
                <div
                  key={n}
                  className="rounded-lg border border-brand-100 bg-brand-50 px-2.5 py-1.5 text-xs leading-snug text-brand-600 dark:border-slate-800 dark:bg-slate-950 dark:text-brand-300"
                >
                  {n}
                </div>
              ))
            ) : (
              <p className="text-xs italic text-slate-400">Sin alertas activas.</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-slate-800">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Nota para el próximo turno
        </p>
        <textarea
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          rows={2}
          placeholder="Escribí la nota de este turno para el siguiente enfermero..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-all focus:border-brand-400 focus:shadow-brand-sm focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
        />
        <div className="mt-2 flex justify-end">
          <button onClick={handleSaveNota} className="btn-nurseia px-4 py-1.5 text-xs">
            Guardar nota
          </button>
        </div>
      </div>
    </div>
  );
}
