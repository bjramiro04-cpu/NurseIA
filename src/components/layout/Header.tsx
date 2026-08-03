"use client";

import { useUiStore, type TabId } from "@/hooks/useUiStore";

const TAB_META: Record<TabId, { title: string; sub: string }> = {
  analisis: { title: "Análisis Clínico", sub: "Diagnósticos NANDA · Priorización ABCDE" },
  triage: { title: "Mapa de Triaje", sub: "Virtual Triage Map · Estado del piso en tiempo real" },
  asistente: { title: "Asistente IA", sub: "Consultá cualquier duda clínica con IA" },
  historial: { title: "Historial", sub: "Evoluciones guardadas de este turno" },
};

export default function Header() {
  const activeTab = useUiStore((s) => s.activeTab);
  const { title, sub } = TAB_META[activeTab];

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h1 className="text-base font-semibold leading-tight text-slate-900 dark:text-white">{title}</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
      </div>

      <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
        Online
      </div>
    </header>
  );
}
