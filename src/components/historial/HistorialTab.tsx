"use client";

import { useHistoryStore } from "@/hooks/useHistoryStore";
import { ClockIcon } from "@/components/icons/Icons";
import HistoryCard from "./HistoryCard";

export default function HistorialTab() {
  const entries = useHistoryStore((s) => s.entries);
  const clear = useHistoryStore((s) => s.clear);

  const handleClear = () => {
    if (!confirm("¿Borrar todo el historial de evoluciones?")) return;
    clear();
  };

  return (
    <div className="mx-auto max-w-3xl animate-fade-in p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-white">Evoluciones guardadas</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Se guardan en este navegador. Se borran al cerrar la sesión si usás modo privado.
          </p>
        </div>
        <button
          onClick={handleClear}
          className="rounded-lg border border-transparent px-3 py-1.5 text-xs text-red-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:hover:border-red-800 dark:hover:bg-red-900/20"
        >
          Borrar todo
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="py-20 text-center text-slate-400 dark:text-slate-600">
          <ClockIcon className="mx-auto mb-4 h-14 w-14 opacity-30" />
          <p className="text-sm font-medium">Todavía no guardaste ninguna evolución.</p>
          <p className="mt-1 text-xs">
            Analizá un paciente y hacé clic en <strong>Guardar</strong>.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <HistoryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
