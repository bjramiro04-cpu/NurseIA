"use client";

import { useAnalysisStore } from "@/hooks/useAnalysisStore";
import DiagnosisCard from "./DiagnosisCard";

export default function DiagnosisList() {
  const sorted = useAnalysisStore((s) => s.sorted);
  const diagCount = useAnalysisStore((s) => s.diagCount);

  if (!sorted) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Diagnósticos NANDA detectados · {diagCount} encontrados
        </h3>
      </div>
      <div className="space-y-3">
        {sorted.map((diag, i) => (
          <DiagnosisCard key={diag.codigo} diag={diag} index={i} />
        ))}
      </div>
    </div>
  );
}
