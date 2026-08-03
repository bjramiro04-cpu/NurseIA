"use client";

import type { MouseEvent } from "react";
import toast from "react-hot-toast";
import type { HistoryEntry } from "@/types/history";
import { useHistoryStore } from "@/hooks/useHistoryStore";
import { useAnalysisStore } from "@/hooks/useAnalysisStore";
import { useUiStore } from "@/hooks/useUiStore";
import { copyToClipboard } from "@/services/clipboard";
import { CopyIcon, TagIcon, TrashIcon } from "@/components/icons/Icons";

export default function HistoryCard({ entry }: { entry: HistoryEntry }) {
  const remove = useHistoryStore((s) => s.remove);
  const restoreFromHistory = useAnalysisStore((s) => s.restoreFromHistory);
  const setActiveTab = useUiStore((s) => s.setActiveTab);

  const preview = entry.text.slice(0, 220);

  const handleRestore = () => {
    restoreFromHistory(entry);
    setActiveTab("analisis");
  };

  const handleCopy = async (e: MouseEvent) => {
    e.stopPropagation();
    await copyToClipboard(entry.text);
    toast.success("Evolución copiada al portapapeles ✓");
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    remove(entry.id);
  };

  return (
    <div
      onClick={handleRestore}
      className="history-item border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400">
              <TagIcon className="h-3 w-3" />
              {entry.diagCount} diagnóstico{entry.diagCount !== 1 ? "s" : ""}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">{entry.date}</span>
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {preview}
            {entry.text.length > 220 ? "…" : ""}
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-col gap-1.5">
          <button
            onClick={handleDelete}
            title="Eliminar"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            title="Copiar"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-900/20"
          >
            <CopyIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-600">
        Hacé clic para recuperar esta evolución en el módulo de Análisis Clínico →
      </p>
    </div>
  );
}
