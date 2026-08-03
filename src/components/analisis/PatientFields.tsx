"use client";

import { useAnalysisStore } from "@/hooks/useAnalysisStore";

const FIELD_INPUT_CLASS =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 " +
  "transition-all placeholder:text-slate-400 focus:border-transparent focus:outline-none " +
  "focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200";

export default function PatientFields() {
  const patient = useAnalysisStore((s) => s.patient);
  const setPatientField = useAnalysisStore((s) => s.setPatientField);

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Datos del paciente{" "}
        <span className="font-normal normal-case text-slate-400">
          (opcional — personalizan la evolución)
        </span>
      </label>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">Nombre / Apellido</label>
          <input
            type="text"
            value={patient.nombre}
            onChange={(e) => setPatientField("nombre", e.target.value)}
            placeholder="Ej: García, Roberto"
            className={FIELD_INPUT_CLASS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">Edad</label>
          <input
            type="number"
            min={0}
            max={120}
            value={patient.edad}
            onChange={(e) => setPatientField("edad", e.target.value)}
            placeholder="Ej: 74"
            className={FIELD_INPUT_CLASS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">Cama / Habitación</label>
          <input
            type="text"
            value={patient.cama}
            onChange={(e) => setPatientField("cama", e.target.value)}
            placeholder="Ej: 204B"
            className={FIELD_INPUT_CLASS}
          />
        </div>
      </div>
    </div>
  );
}
