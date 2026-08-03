"use client";

import { useAnalysisStore } from "@/hooks/useAnalysisStore";
import { useUiStore } from "@/hooks/useUiStore";
import { BrainIcon, SpinnerIcon } from "@/components/icons/Icons";

export default function AnalysisActions() {
  const rawText = useAnalysisStore((s) => s.rawText);
  const loading = useAnalysisStore((s) => s.loading);
  const analyze = useAnalysisStore((s) => s.analyze);
  const clear = useAnalysisStore((s) => s.clear);
  const isSpanish = useUiStore((s) => s.isSpanish);

  return (
    <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
      <span className="text-xs text-slate-400">{rawText.length} caracteres</span>
      <div className="flex items-center gap-2">
        <button
          onClick={clear}
          className="rounded-lg px-3 py-1.5 text-xs text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          Limpiar
        </button>
        <button onClick={() => analyze(isSpanish)} disabled={loading} className="btn-nurseia text-sm">
          {loading ? <SpinnerIcon /> : <BrainIcon className="h-4 w-4" />}
          <span>{loading ? "Analizando..." : "Analizar"}</span>
        </button>
      </div>
    </div>
  );
}
