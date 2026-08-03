"use client";

import { useState } from "react";
import { useAnalysisStore } from "@/hooks/useAnalysisStore";
import { copyToClipboard } from "@/services/clipboard";
import { parseEvolution } from "@/services/evolutionFormatter";
import { BrainIcon, CheckIcon, CopyIcon, DocumentIcon, SaveIcon } from "@/components/icons/Icons";

function EvolutionSkeleton() {
  const widths = ["100%", "85%", "95%", "70%", "100%", "80%", "90%"];
  return (
    <div>
      <div className="space-y-2.5">
        {widths.map((w, i) => (
          <div key={i} className={`h-3 rounded ${i === 4 ? "mt-3" : ""} skeleton-shimmer`} style={{ width: w }} />
        ))}
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" />
        Generando evolución PAC personalizada con IA...
      </p>
    </div>
  );
}

export default function EvolutionPanel() {
  const evolutionText = useAnalysisStore((s) => s.evolutionText);
  const evolutionLoading = useAnalysisStore((s) => s.evolutionLoading);
  const aiGenerated = useAnalysisStore((s) => s.aiGenerated);
  const saveToHistory = useAnalysisStore((s) => s.saveToHistory);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!evolutionText) return;
    await copyToClipboard(evolutionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const groups = evolutionText ? parseEvolution(evolutionText) : [];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-brand-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <DocumentIcon className="h-4 w-4 text-violet-600" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Evolución PAC</span>
          {aiGenerated && (
            <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-600 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400">
              <BrainIcon className="h-3 w-3" />
              Personalizada por IA
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={saveToHistory}
            className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40"
          >
            <SaveIcon className="h-3.5 w-3.5" />
            Guardar
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 transition-colors hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-300 dark:hover:bg-violet-900/40"
          >
            {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
            {copied ? "¡Copiado!" : "Copiar"}
          </button>
        </div>
      </div>

      <div className="px-5 py-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {evolutionLoading ? (
          <EvolutionSkeleton />
        ) : (
          groups.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <hr className="my-5 border-slate-200 dark:border-slate-700" />}
              {group.blocks.map((block, bi) => (
                <p key={bi} className="mt-3 whitespace-pre-wrap first:mt-0">
                  {block.label && <strong className={`mb-1 block ${block.colorClass}`}>{block.label}</strong>}
                  {block.text}
                </p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
