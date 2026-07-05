/**
 * nurseIA — src/components/tabAsistente.js
 * Asistente IA: chat conectado a Claude API para consultas clínicas.
 */

import { markdownToHtml } from "../utils/helpers.js";

// ── Estado local del chat ────────────────────────────────────────
let chatHistory = [];

// ── System prompt especializado en enfermería ────────────────────
const SYSTEM_PROMPT = `Sos nurseIA, un asistente clínico especializado en enfermería.
Respondés en español (o en inglés si el usuario escribe en inglés).

Podés ayudar con:
- Diagnósticos NANDA y su justificación (código, RC, MP)
- Intervenciones NIC relacionadas a cada diagnóstico
- Resultados NOC esperados
- Priorización ABCDE en situaciones de urgencia
- Redacción de evoluciones de enfermería estructuradas
- Protocolos y procedimientos clínicos habituales
- Farmacología básica: mecanismo de acción, dosis habituales, cuidados de administración
- Cálculo de goteo, dosis por peso y preparación de soluciones
- Interpretación básica de valores de laboratorio y signos vitales

Tus respuestas son claras, estructuradas y en lenguaje clínico apropiado para enfermeros universitarios.
Cuando sea relevante, organizá la respuesta con negritas para los títulos y viñetas para los puntos.

IMPORTANTE: Siempre recordá al final que tus respuestas son orientativas y no reemplazan el criterio clínico profesional ni el protocolo institucional.`;

// ── Atajos de consulta frecuente ────────────────────────────────
const QUICK_PROMPTS = [
  "¿Cuáles son las intervenciones NIC para el dolor agudo (00132)?",
  "¿Cómo priorizo según el esquema ABCDE?",
  "¿Cómo redactar una evolución de enfermería profesional?",
  "¿Cuál es el cuidado de enfermería para una vía periférica?",
];

// ── HTML del tab ─────────────────────────────────────────────────
export function renderTabAsistente() {
  return `
    <div
      id="tab-asistente"
      class="hidden flex flex-col"
      style="height: calc(100vh - 64px);"
    >
      <!-- Área de mensajes -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4" id="chatMessages">

        <!-- Mensaje de bienvenida -->
        <div class="flex items-start gap-3">
          ${avatarAI()}
          <div class="bubble-ai rounded-2xl rounded-tl-none px-4 py-3 max-w-lg fade-in">
            <p class="text-sm leading-relaxed">
              Hola, soy el asistente clínico de <strong>nurseIA</strong>. Puedo ayudarte con
              diagnósticos NANDA, intervenciones NIC, protocolos, farmacología, cálculos de dosis
              y cualquier otra consulta clínica de enfermería. ¿En qué puedo ayudarte hoy?
            </p>
            <div class="flex flex-wrap gap-2 mt-3">
              ${QUICK_PROMPTS.map(q => `
                <button
                  onclick="window.nurseIA.quickPrompt(${JSON.stringify(q)})"
                  class="text-xs px-3 py-1.5 bg-violet-50 dark:bg-violet-900/30
                         text-violet-700 dark:text-violet-300 rounded-lg
                         hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors
                         border border-violet-200 dark:border-violet-800"
                >
                  ${q.length > 40 ? q.slice(0, 40) + "…" : q}
                </button>
              `).join("")}
            </div>
          </div>
        </div>

      </div>

      <!-- Input del chat -->
      <div class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex-shrink-0">
        <div class="max-w-3xl mx-auto flex items-end gap-3">
          <textarea
            id="chatInput"
            rows="1"
            class="flex-1 text-sm text-slate-700 dark:text-slate-200
                   bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700
                   rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2
                   focus:ring-violet-500 focus:border-transparent placeholder:text-slate-400 transition-all"
            placeholder="Preguntá sobre diagnósticos, intervenciones, protocolos, farmacología..."
            style="min-height: 48px; max-height: 160px;"
            oninput="this.style.height='auto'; this.style.height=Math.min(this.scrollHeight,160)+'px'"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();window.nurseIA.sendChat();}"
          ></textarea>
          <button
            id="sendBtn"
            onclick="window.nurseIA.sendChat()"
            class="flex-shrink-0 w-10 h-10 bg-violet-600 hover:bg-violet-700 disabled:opacity-50
                   text-white rounded-xl flex items-center justify-center transition-colors"
            title="Enviar (Enter)"
          >
            <svg id="sendIcon" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            <svg id="sendLoading" class="w-4 h-4 spinner hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
        </div>
        <p class="text-xs text-slate-400 dark:text-slate-600 text-center mt-2">
          nurseIA puede cometer errores. Verificá siempre con fuentes clínicas y el protocolo de tu institución.
        </p>
      </div>
    </div>
  `;
}

// ── Enviar mensaje al chat ───────────────────────────────────────
export async function sendChat() {
  const input = document.getElementById("chatInput");
  const msg = input?.value?.trim();
  if (!msg) return;

  appendMessage(msg, "user");
  input.value = "";
  input.style.height = "48px";

  setChatLoading(true);
  chatHistory.push({ role: "user", content: msg });

  // Indicador de escritura
  const typingId = `typing-${Date.now()}`;
  appendTyping(typingId);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model:      "claude-sonnet-4-6",
        max_tokens: 1000,
        system:     SYSTEM_PROMPT,
        messages:   chatHistory,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Error en la API");
    }

    const reply = data.content?.map(b => b.text || "").join("") || "No se obtuvo respuesta.";
    document.getElementById(typingId)?.remove();
    appendMessage(reply, "ai");
    chatHistory.push({ role: "assistant", content: reply });

  } catch (err) {
    document.getElementById(typingId)?.remove();
    appendMessage(
      `Error de conexión: ${err.message}. Verificá tu conexión a internet e intentá de nuevo.`,
      "ai",
      true
    );
  }

  setChatLoading(false);
}

// ── Prompt rápido ────────────────────────────────────────────────
export function quickPrompt(text) {
  const input = document.getElementById("chatInput");
  if (input) {
    input.value = text;
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 160) + "px";
  }
  sendChat();
}

// ── Renderiza un mensaje en el chat ─────────────────────────────
function appendMessage(text, role, isError = false) {
  const container = document.getElementById("chatMessages");
  if (!container) return;

  const isAI = role === "ai";
  const el = document.createElement("div");
  el.className = `flex items-start gap-3 fade-in ${isAI ? "" : "flex-row-reverse"}`;

  const formatted = markdownToHtml(text);

  el.innerHTML = `
    ${isAI ? avatarAI() : avatarUser()}
    <div class="${isAI
      ? `bubble-ai rounded-2xl rounded-tl-none ${isError ? "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20" : ""}`
      : "bubble-user rounded-2xl rounded-tr-none"
    } px-4 py-3 max-w-lg text-sm leading-relaxed">
      ${formatted}
    </div>
  `;

  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

// ── Indicador de escritura (tres puntitos animados) ──────────────
function appendTyping(id) {
  const container = document.getElementById("chatMessages");
  if (!container) return;

  const el = document.createElement("div");
  el.id = id;
  el.className = "flex items-start gap-3 fade-in";
  el.innerHTML = `
    ${avatarAI()}
    <div class="bubble-ai rounded-2xl rounded-tl-none px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>
  `;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

// ── Loading state del botón enviar ──────────────────────────────
function setChatLoading(loading) {
  const btn  = document.getElementById("sendBtn");
  const icon = document.getElementById("sendIcon");
  const spin = document.getElementById("sendLoading");
  if (!btn) return;
  btn.disabled = loading;
  icon?.classList.toggle("hidden", loading);
  spin?.classList.toggle("hidden", !loading);
}

// ── Avatares ─────────────────────────────────────────────────────
function avatarAI() {
  return `
    <div class="w-8 h-8 bg-violet-100 dark:bg-violet-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg class="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0
          00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    </div>
  `;
}

function avatarUser() {
  return `
    <div class="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg class="w-4 h-4 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
    </div>
  `;
}