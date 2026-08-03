"use client";

import { useTriageStore } from "@/hooks/useTriageStore";

export default function TriageStats() {
  const rooms = useTriageStore((s) => s.rooms);

  const stats = rooms.reduce(
    (acc, room) => {
      room.camas.forEach((cama) => {
        acc.total++;
        if (cama.estado === "rojo") acc.criticos++;
        else if (cama.estado === "naranja") acc.alertas++;
        else if (cama.estado === "verde") acc.estables++;
        else acc.vacias++;
      });
      return acc;
    },
    { total: 0, criticos: 0, alertas: 0, estables: 0, vacias: 0 },
  );

  const cards = [
    { val: stats.total, label: "Total camas", classes: "bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-white dark:border-slate-800" },
    { val: stats.criticos, label: "Críticos 🔴", classes: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900" },
    { val: stats.alertas, label: "Observación 🟠", classes: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900" },
    { val: stats.estables, label: "Estables 🟢", classes: "bg-green-50 text-green-600 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900" },
    { val: stats.vacias, label: "Vacías ⚪", classes: "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {cards.map((c) => (
        <div key={c.label} className={`rounded-xl border p-3 text-center shadow-brand-sm ${c.classes}`}>
          <div className="text-2xl font-bold">{c.val}</div>
          <div className="mt-0.5 text-xs text-slate-500">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
