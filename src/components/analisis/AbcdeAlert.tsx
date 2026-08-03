"use client";

import { useAnalysisStore } from "@/hooks/useAnalysisStore";
import { AlertTriangleIcon } from "@/components/icons/Icons";

export default function AbcdeAlert() {
  const alert = useAnalysisStore((s) => s.abcdeAlert);
  if (!alert) return null;

  return (
    <div className="animate-alert-pulse rounded-2xl border border-red-300 bg-red-50 p-5 dark:border-red-800 dark:bg-red-950/40">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/50">
          <AlertTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm font-semibold text-red-800 dark:text-red-300">Alerta ABCDE</span>
            <span className="rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              {alert.category}
            </span>
          </div>
          <p className="text-sm text-red-700 dark:text-red-400">{alert.message}</p>
        </div>
      </div>
    </div>
  );
}
