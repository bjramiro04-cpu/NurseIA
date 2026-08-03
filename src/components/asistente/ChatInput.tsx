"use client";

import { useRef, useState } from "react";
import { useChatStore } from "@/hooks/useChatStore";
import { SendIcon, SpinnerIcon } from "@/components/icons/Icons";

function autoResize(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
}

export default function ChatInput() {
  const [text, setText] = useState("");
  const sending = useChatStore((s) => s.sending);
  const send = useChatStore((s) => s.send);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "48px";
    send(trimmed);
  };

  return (
    <div className="flex-shrink-0 border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            autoResize(e.target);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Preguntá sobre diagnósticos, intervenciones, protocolos, farmacología..."
          style={{ minHeight: 48, maxHeight: 160 }}
          className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm
            text-slate-700 transition-all placeholder:text-slate-400 focus:border-transparent
            focus:outline-none focus:ring-2 focus:ring-brand-500
            dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        />
        <button
          onClick={handleSend}
          disabled={sending}
          title="Enviar (Enter)"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
        >
          {sending ? <SpinnerIcon /> : <SendIcon className="h-4 w-4" />}
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-600">
        nurseIA puede cometer errores. Verificá siempre con fuentes clínicas y el protocolo de tu institución.
      </p>
    </div>
  );
}
