"use client";

import type { AiNandaDiagnosis } from "@/types/analysis";
import { pillClass, priorityBadgeClass } from "@/services/nandaEngine";

const CIRCUMFERENCE = 2 * Math.PI * 15.5;

export default function DiagnosisCard({ diag, index }: { diag: AiNandaDiagnosis; index: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(diag.matchPercent)));
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * pct) / 100;

  return (
    <div
      className="animate-slide-up rounded-xl border border-slate-200 bg-white p-4 transition-all
        hover:border-violet-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700"
      style={{ animationDelay: `${Math.min(index, 5) * 0.05}s` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/40">
            <span className="text-xs font-bold text-violet-700 dark:text-violet-300">{index + 1}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold leading-snug text-slate-900 dark:text-white">
              {diag.diagnostico}
            </h4>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${priorityBadgeClass(diag.prioridad)}`}>
                {diag.prioridad}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${pillClass(diag.abcde)}`}>
                ABCDE: {diag.abcde}
              </span>
              <span className="font-mono text-xs text-slate-400">{diag.codigo}</span>
            </div>
          </div>
        </div>

        <div className="relative h-11 w-11 flex-shrink-0">
          <svg className="h-11 w-11 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx={18}
              cy={18}
              r={15.5}
              fill="none"
              strokeWidth={3}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700"
            />
            <circle
              cx={18}
              cy={18}
              r={15.5}
              fill="none"
              strokeWidth={3}
              strokeLinecap="round"
              stroke="currentColor"
              className="text-brand-500 transition-[stroke-dashoffset] duration-700 dark:text-brand-300"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400">
            {pct}%
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 pl-10">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">R/C:</span> {diag.rc}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">M/P:</span> {diag.mp}
        </p>
        <p className="mt-1 border-t border-slate-100 pt-1.5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
          {diag.dominio}
        </p>
      </div>
    </div>
  );
}
