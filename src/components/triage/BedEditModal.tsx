"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTriageStore } from "@/hooks/useTriageStore";
import { NANDA } from "@/mocks/nanda";
import { CloseIcon } from "@/components/icons/Icons";

export default function BedEditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const selectedCamaId = useTriageStore((s) => s.selectedCamaId);
  const findCama = useTriageStore((s) => s.findCama);
  const saveCamaEdit = useTriageStore((s) => s.saveCamaEdit);

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [dx, setDx] = useState("");
  const [iaText, setIaText] = useState("");

  useEffect(() => {
    if (!open || !selectedCamaId) return;
    const cama = findCama(selectedCamaId);
    setNombre(cama?.nombre ?? "");
    setEdad(cama?.edad ? String(cama.edad) : "");
    setDx(cama?.dx ?? "");
    setIaText(cama?.ia ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedCamaId]);

  if (!open) return null;

  const handleSave = () => {
    saveCamaEdit(
      { nombre: nombre.trim(), edad: parseInt(edad, 10) || null, dx: dx.trim(), iaText: iaText.trim() },
      NANDA,
    );
    onClose();
    toast.success("Paciente actualizado ✓");
  };

  return (
    <div className="triage-modal-overlay">
      <div className="triage-modal">
        <div className="triage-modal-header">
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">Editar paciente</h3>
          <button onClick={onClose} className="p-1 text-slate-400 transition-colors hover:text-slate-700">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Nombre del paciente
              </label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Apellido, Nombre"
                className="triage-input w-full"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">Edad</label>
              <input
                type="number"
                min={0}
                max={120}
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                placeholder="Ej: 75"
                className="triage-input w-full"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
              Diagnóstico médico
            </label>
            <input
              value={dx}
              onChange={(e) => setDx(e.target.value)}
              placeholder="Ej: Neumonía bilateral"
              className="triage-input w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">Estado</label>
            <div className="flex items-center gap-2">
              <select
                disabled
                title="El estado se actualiza automáticamente según la valoración"
                className="estado-select w-full"
                defaultValue="rojo"
              >
                <option value="rojo">🔴 Crítico</option>
                <option value="naranja">🟠 En observación</option>
                <option value="verde">🟢 Estable</option>
                <option value="vacia">⚪ Vacía</option>
              </select>
              <div className="whitespace-nowrap rounded bg-slate-100 px-2 py-1 text-xs text-slate-400 dark:bg-slate-800">
                Auto
              </div>
            </div>
            <p className="mt-1 text-xs italic text-slate-400">
              Nota: el estado se actualiza automáticamente basado en la valoración ingresada.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
              Resumen IA / Nota del turno anterior
            </label>
            <textarea
              value={iaText}
              onChange={(e) => setIaText(e.target.value)}
              rows={3}
              placeholder="Describí el estado del paciente al inicio del turno..."
              className="triage-input w-full resize-none"
            />
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-2 dark:border-slate-800">
            <button onClick={onClose} className="btn-nurseia-outline text-sm">
              Cancelar
            </button>
            <button onClick={handleSave} className="btn-nurseia text-sm">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
