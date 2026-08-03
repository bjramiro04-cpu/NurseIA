"use client";

import { useEffect, useRef } from "react";
import { useAnalysisStore } from "@/hooks/useAnalysisStore";
import { useUiStore } from "@/hooks/useUiStore";
import PatientFields from "./PatientFields";
import ClinicalInput from "./ClinicalInput";
import AnalysisActions from "./AnalysisActions";
import AbcdeAlert from "./AbcdeAlert";
import DiagnosisList from "./DiagnosisList";
import EvolutionPanel from "./EvolutionPanel";

export default function AnalisisTab() {
  const showResults = useAnalysisStore((s) => s.showResults);
  const regenerateEvolution = useAnalysisStore((s) => s.regenerateEvolution);
  const isSpanish = useUiStore((s) => s.isSpanish);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    regenerateEvolution(isSpanish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpanish]);

  return (
    <div className="mx-auto max-w-3xl animate-fade-in space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-brand-md dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-4 px-6 pb-3 pt-6">
          <PatientFields />
          <ClinicalInput />
        </div>
        <AnalysisActions />
      </div>

      {showResults && (
        <div className="space-y-5">
          <AbcdeAlert />
          <DiagnosisList />
          <EvolutionPanel />
        </div>
      )}
    </div>
  );
}
