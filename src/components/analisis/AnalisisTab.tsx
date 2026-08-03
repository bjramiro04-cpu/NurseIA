"use client";

import { useAnalysisStore } from "@/hooks/useAnalysisStore";
import PatientFields from "./PatientFields";
import ClinicalInput from "./ClinicalInput";
import AnalysisActions from "./AnalysisActions";
import AbcdeAlert from "./AbcdeAlert";
import DiagnosisList from "./DiagnosisList";
import EvolutionPanel from "./EvolutionPanel";

export default function AnalisisTab() {
  const showResults = useAnalysisStore((s) => s.showResults);

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
