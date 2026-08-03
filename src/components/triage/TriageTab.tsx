"use client";

import { useState } from "react";
import { useTriageStore } from "@/hooks/useTriageStore";
import { GearIcon } from "@/components/icons/Icons";
import TriageStats from "./TriageStats";
import TriageMap from "./TriageMap";
import BedDetailPanel from "./BedDetailPanel";
import TriageConfigModal from "./TriageConfigModal";
import BedEditModal from "./BedEditModal";

export default function TriageTab() {
  const [configOpen, setConfigOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const selectedCamaId = useTriageStore((s) => s.selectedCamaId);

  return (
    <div className="animate-fade-in space-y-5 p-5">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-800 dark:text-white">Virtual Triage Map</h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Hacé clic en una cama para ver el detalle · Configurá tu piso con el botón
            </p>
          </div>
          <button onClick={() => setConfigOpen(true)} className="btn-nurseia text-sm">
            <GearIcon className="h-4 w-4" />
            Configurar piso
          </button>
        </div>
        <TriageStats />
      </div>

      <TriageMap />

      {selectedCamaId && <BedDetailPanel onEdit={() => setEditOpen(true)} />}

      <TriageConfigModal open={configOpen} onClose={() => setConfigOpen(false)} />
      <BedEditModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
