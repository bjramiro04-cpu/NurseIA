"use client";

import { useAnalysisStore } from "@/hooks/useAnalysisStore";

export default function ClinicalInput() {
  const rawText = useAnalysisStore((s) => s.rawText);
  const setRawText = useAnalysisStore((s) => s.setRawText);

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Descripción clínica
      </label>
      <textarea
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        rows={7}
        placeholder="Describí el estado actual del paciente: signos vitales (TA, FC, Sat, T°), síntomas, observaciones clínicas, medicación actual..."
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm
          text-slate-700 transition-all placeholder:text-slate-400 focus:border-transparent
          focus:outline-none focus:ring-2 focus:ring-brand-500
          dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
      />
    </div>
  );
}
