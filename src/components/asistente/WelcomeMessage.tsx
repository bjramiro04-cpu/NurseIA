"use client";

import { useChatStore } from "@/hooks/useChatStore";
import { AiAvatarIcon } from "@/components/icons/Icons";

const QUICK_PROMPTS = [
  "¿Cuáles son las intervenciones NIC para el dolor agudo (00132)?",
  "¿Cómo priorizo según el esquema ABCDE?",
  "¿Cómo redactar una evolución de enfermería profesional?",
  "¿Cuál es el cuidado de enfermería para una vía periférica?",
];

export default function WelcomeMessage() {
  const send = useChatStore((s) => s.send);

  return (
    <div className="flex animate-fade-in items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40">
        <AiAvatarIcon className="h-4 w-4 text-violet-600" />
      </div>
      <div className="bubble-ai max-w-lg rounded-2xl px-4 py-3">
        <p className="text-sm leading-relaxed">
          Hola, soy el asistente clínico de <strong>nurseIA</strong>. Puedo ayudarte con diagnósticos NANDA,
          intervenciones NIC, protocolos, farmacología, cálculos de dosis y cualquier otra consulta clínica de
          enfermería. ¿En qué puedo ayudarte hoy?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs text-violet-700 transition-colors hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-900/50"
            >
              {q.length > 40 ? `${q.slice(0, 40)}…` : q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
