"use client";

import { useUiStore } from "@/hooks/useUiStore";
import { useHydrateStores } from "@/hooks/useHydrateStores";
import { useApplyDarkMode } from "@/hooks/useApplyDarkMode";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AnalisisTab from "@/components/analisis/AnalisisTab";
import TriageTab from "@/components/triage/TriageTab";
import AsistenteTab from "@/components/asistente/AsistenteTab";
import HistorialTab from "@/components/historial/HistorialTab";

export default function AppShell() {
  useHydrateStores();
  useApplyDarkMode();

  const activeTab = useUiStore((s) => s.activeTab);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto" key={activeTab}>
          {activeTab === "analisis" && <AnalisisTab />}
          {activeTab === "triage" && <TriageTab />}
          {activeTab === "asistente" && <AsistenteTab />}
          {activeTab === "historial" && <HistorialTab />}
        </main>
      </div>
    </div>
  );
}
