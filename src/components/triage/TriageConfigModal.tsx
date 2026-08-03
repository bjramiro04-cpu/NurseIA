"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTriageStore } from "@/hooks/useTriageStore";
import { CloseIcon } from "@/components/icons/Icons";

export default function TriageConfigModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const floorName = useTriageStore((s) => s.floorName);
  const rooms = useTriageStore((s) => s.rooms);
  const saveFloorName = useTriageStore((s) => s.saveFloorName);
  const addHab = useTriageStore((s) => s.addHab);
  const removeHab = useTriageStore((s) => s.removeHab);
  const addCamaToHab = useTriageStore((s) => s.addCamaToHab);
  const removeCama = useTriageStore((s) => s.removeCama);
  const updateHabNum = useTriageStore((s) => s.updateHabNum);
  const updateCamaField = useTriageStore((s) => s.updateCamaField);
  const resetToDefault = useTriageStore((s) => s.resetToDefault);

  const [floorInput, setFloorInput] = useState(floorName);
  useEffect(() => {
    if (open) setFloorInput(floorName);
  }, [open, floorName]);

  if (!open) return null;

  const handleSave = () => {
    saveFloorName(floorInput);
    onClose();
    toast.success("Configuración guardada ✓");
  };

  const handleReset = () => {
    if (!confirm("¿Restaurar el mapa de demo? Se perderán todos los cambios.")) return;
    resetToDefault();
    toast.success("Mapa restaurado al demo ✓");
  };

  return (
    <div className="triage-modal-overlay">
      <div className="triage-modal">
        <div className="triage-modal-header">
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">Configurar piso</h3>
            <p className="mt-0.5 text-xs text-slate-500">Editá habitaciones, camas y estados</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Nombre del piso
            </label>
            <input
              value={floorInput}
              onChange={(e) => setFloorInput(e.target.value)}
              placeholder="Ej: Piso 2 — Internación General"
              className="triage-input w-full"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Habitaciones
              </label>
              <button onClick={addHab} className="btn-nurseia-outline px-3 py-1 text-xs">
                + Agregar hab.
              </button>
            </div>
            <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="hab-config-row mb-2 border-b-0 pb-2">
                    <span className="w-8 text-xs font-semibold uppercase tracking-wider text-slate-500">Hab.</span>
                    <input
                      defaultValue={room.hab}
                      onBlur={(e) => updateHabNum(room.id, e.target.value)}
                      className="triage-input w-20 text-center font-semibold"
                      placeholder="101"
                    />
                    <span className="flex-1 text-xs text-slate-400">
                      {room.camas.length} cama{room.camas.length !== 1 ? "s" : ""}
                    </span>
                    <button
                      onClick={() => addCamaToHab(room.id)}
                      className="rounded px-2 py-1 text-xs text-violet-600 transition-colors hover:bg-violet-50 hover:text-violet-800 dark:hover:bg-violet-900/20"
                    >
                      + Cama
                    </button>
                    <button
                      onClick={() => {
                        if (!removeHab(room.id)) toast.error("Debe haber al menos una habitación");
                      }}
                      className="rounded px-2 py-1 text-xs text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    >
                      ✕ Hab.
                    </button>
                  </div>

                  <div className="space-y-1.5 pl-2">
                    {room.camas.map((cama) => (
                      <div key={cama.id} className="hab-config-row">
                        <span className="w-16 font-mono text-xs text-slate-400">{cama.id}</span>
                        <input
                          defaultValue={cama.nombre}
                          onBlur={(e) => updateCamaField(cama.id, "nombre", e.target.value)}
                          placeholder="Apellido, Nombre"
                          className="triage-input flex-1 text-xs"
                        />
                        <select
                          defaultValue={cama.estado}
                          onChange={(e) => updateCamaField(cama.id, "estado", e.target.value)}
                          className="estado-select"
                        >
                          <option value="rojo">🔴 Crítico</option>
                          <option value="naranja">🟠 Alerta</option>
                          <option value="verde">🟢 Estable</option>
                          <option value="vacia">⚪ Vacía</option>
                        </select>
                        <button
                          onClick={() => {
                            if (!removeCama(room.id, cama.id))
                              toast.error("Debe haber al menos una cama por habitación");
                          }}
                          title="Eliminar cama"
                          className="p-1 text-slate-400 transition-colors hover:text-red-500"
                        >
                          <CloseIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
            <button
              onClick={handleReset}
              className="rounded-lg px-3 py-2 text-xs text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
            >
              Restaurar demo
            </button>
            <div className="flex gap-2">
              <button onClick={onClose} className="btn-nurseia-outline text-sm">
                Cancelar
              </button>
              <button onClick={handleSave} className="btn-nurseia text-sm">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
