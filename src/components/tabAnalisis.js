/**
 * nurseIA — src/components/tabAnalisis.js
 * Módulo de Análisis Clínico v3.0
 * - Campos de paciente (nombre, edad, cama)
 * - Motor NANDA con matching tolerante
 * - Evolución PAC personalizada por IA (Claude API)
 * - Fallback a evoluciones estáticas si no hay conexión
 */

import { NANDA } from "../data/nanda.js?v=2";
import {
  normalizeText,
  keywordMatches,
  pillClass,
  priorityBadgeClass,
  calcMatchPercent,
  sortByPriority,
  copyToClipboard,
  saveToStorage,
  loadFromStorage,
  formatDate,
  generateId,
} from "../utils/helpers.js?v=2";

// ── Estado local ────────────────────────────────────────────────
let isSpanish   = true;
let lastResults = null;

// ══════════════════════════════════════════════════════════════════
// HTML DEL TAB
// ══════════════════════════════════════════════════════════════════
export function renderTabAnalisis() {
  return `
    <div id="tab-analisis" class="fade-in p-6 max-w-3xl mx-auto space-y-6">

      <!-- ── Tarjeta de input ── -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden" style="box-shadow: var(--shadow-md)">
        <div class="px-6 pt-6 pb-3 space-y-4">

          <!-- Datos del paciente (opcionales) -->
          <div>
            <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Datos del paciente <span class="font-normal normal-case text-slate-400">(opcional — personalizan la evolución)</span>
            </label>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="text-xs text-slate-500 dark:text-slate-400 block mb-1">Nombre / Apellido</label>
                <input
                  type="text"
                  id="pacienteNombre"
                  class="w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200
                         bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500
                         focus:border-transparent transition-all placeholder:text-slate-400"
                  placeholder="Ej: García, Roberto"
                />
              </div>
              <div>
                <label class="text-xs text-slate-500 dark:text-slate-400 block mb-1">Edad</label>
                <input
                  type="number"
                  id="pacienteEdad"
                  min="0" max="120"
                  class="w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200
                         bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500
                         focus:border-transparent transition-all placeholder:text-slate-400"
                  placeholder="Ej: 74"
                />
              </div>
              <div>
                <label class="text-xs text-slate-500 dark:text-slate-400 block mb-1">Cama / Habitación</label>
                <input
                  type="text"
                  id="pacienteCama"
                  class="w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200
                         bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500
                         focus:border-transparent transition-all placeholder:text-slate-400"
                  placeholder="Ej: 204B"
                />
              </div>
            </div>
          </div>

          <!-- Descripción clínica -->
          <div>
            <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Descripción clínica
            </label>
            <textarea
              id="evolutionText"
              rows="7"
              class="w-full px-4 py-3 text-sm text-slate-700 dark:text-slate-200
                     bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700
                     rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500
                     focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500
                     transition-all"
              placeholder="Describí el estado actual del paciente: signos vitales (TA, FC, Sat, T°), síntomas, observaciones clínicas, medicación actual..."
            ></textarea>
          </div>
        </div>

        <!-- Footer con contador y botones -->
        <div class="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
          <span class="text-xs text-slate-400">
            <span id="charCount">0</span> caracteres
          </span>
          <div class="flex items-center gap-2">
            <button
              onclick="window.nurseIA.clearAnalysis()"
              class="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200
                     px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Limpiar
            </button>
            <button
              id="analyzeBtn"
              onclick="window.nurseIA.analyze()"
              class="btn-nurseia text-sm"
            >
              <svg id="analyzeIcon" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3
                     m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374
                     3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <svg id="loadingIcon" class="w-4 h-4 spinner hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581
                     m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span id="btnText">Analizar</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ── Sección de resultados (oculta hasta analizar) ── -->
      <div id="resultsSection" class="hidden space-y-5">

        <!-- Alerta ABCDE crítica -->
        <div id="priorityAlert" class="hidden alert-pulse bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 rounded-2xl p-5">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-semibold text-red-800 dark:text-red-300">Alerta ABCDE</span>
                <span id="abcdeBadge" class="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded-md"></span>
              </div>
              <p id="abcdeText" class="text-sm text-red-700 dark:text-red-400"></p>
            </div>
          </div>
        </div>

        <!-- Diagnósticos NANDA -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Diagnósticos NANDA detectados · <span id="diagCount">0</span> encontrados
            </h3>
          </div>
          <div id="diagnosesContainer" class="space-y-3"></div>
        </div>

        <!-- Evolución generada -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden" style="box-shadow: var(--shadow-md)">
          <div class="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-2 flex-wrap">
              <svg class="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="text-sm font-semibold text-slate-800 dark:text-slate-200">Evolución PAC</span>
              <span id="aiEvolutionBadge" class="hidden items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                Personalizada por IA
              </span>
            </div>
            <div class="flex items-center gap-2">
              <button
                onclick="window.nurseIA.saveAnalysis()"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                       text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20
                       hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition-colors
                       border border-green-200 dark:border-green-800"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                </svg>
                Guardar
              </button>
              <button
                id="copyBtn"
                onclick="window.nurseIA.copyEvolution()"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                       text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/20
                       hover:bg-violet-100 dark:hover:bg-violet-900/40 rounded-lg transition-colors
                       border border-violet-200 dark:border-violet-800"
              >
                <svg id="copyIcon" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <svg id="checkIcon" class="w-3.5 h-3.5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                <span id="copyText">Copiar</span>
              </button>
            </div>
          </div>

          <!-- Contenido de la evolución -->
          <div
            id="generatedEvolution"
            class="px-5 py-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm"
          ></div>
        </div>

      </div>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════════
export function initTabAnalisis() {
  const ta = document.getElementById("evolutionText");
  if (ta) {
    ta.addEventListener("input", () => {
      document.getElementById("charCount").textContent = ta.value.length;
    });
  }
}

// ══════════════════════════════════════════════════════════════════
// MOTOR DE ANÁLISIS PRINCIPAL
// ══════════════════════════════════════════════════════════════════
export async function analyze() {
  const ta = document.getElementById("evolutionText");
  const rawText = ta?.value.trim();
  if (!rawText) {
    showToast("Describí el estado del paciente antes de analizar.", "warn");
    return;
  }

  const cleanText = normalizeText(rawText);

  // Spinner visual — delay corto para que se vea el cambio
  setLoading(true);
  await new Promise(resolve => setTimeout(resolve, 500));
  setLoading(false);

  // ── 1. Detección NANDA (síncrono, instantáneo) ────────────────
  const found = NANDA.filter(d =>
    d.palabras_clave.some(kw => keywordMatches(kw, cleanText))
  );

  if (!found.length) {
    showToast("No se detectaron patrones clínicos. Describí más síntomas específicos.", "warn");
    return;
  }

  const sorted = sortByPriority(found, cleanText);
  lastResults = { sorted, rawText, cleanText, evolucionTexto: "" };

  // ── 2. Renderizar tarjetas NANDA y alerta ABCDE (instantáneo) ─
  renderDiagnoses(sorted, cleanText);
  renderABCDEAlert(sorted);

  // ── 3. Mostrar la sección de resultados con las tarjetas ya ────
  const results = document.getElementById("resultsSection");
  results.classList.remove("hidden");
  results.scrollIntoView({ behavior: "smooth", block: "start" });

  // ── 4. Generar evolución PAC con IA (async, 3-5 seg) ──────────
  // Las tarjetas NANDA ya son visibles mientras la IA trabaja
  await generateEvolutionWithAI(sorted, rawText);
}

// ══════════════════════════════════════════════════════════════════
// TARJETAS NANDA
// ══════════════════════════════════════════════════════════════════
function renderDiagnoses(sorted, cleanText) {
  document.getElementById("diagCount").textContent = sorted.length;
  const container = document.getElementById("diagnosesContainer");
  container.innerHTML = "";

  sorted.forEach((diag, i) => {
    const pct    = calcMatchPercent(diag, cleanText);
    const circ   = 2 * Math.PI * 15.5;
    const offset = circ - (circ * pct / 100);

    const card = document.createElement("div");
    card.className = "diag-card slide-up bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md hover:border-violet-200 dark:hover:border-violet-700 transition-all";

    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3 flex-1 min-w-0">
          <div class="w-7 h-7 bg-violet-100 dark:bg-violet-900/40 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <span class="text-violet-700 dark:text-violet-300 text-xs font-bold">${i + 1}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-slate-900 dark:text-white leading-snug">${diag.diagnostico}</h4>
            <div class="flex flex-wrap items-center gap-2 mt-1.5">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium border ${priorityBadgeClass(diag.prioridad)}">${diag.prioridad}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-medium ${pillClass(diag.abcde)}">ABCDE: ${diag.abcde}</span>
              <span class="text-xs text-slate-400 font-mono">${diag.codigo}</span>
            </div>
          </div>
        </div>
        <!-- Círculo de coincidencia -->
        <div class="relative w-11 h-11 flex-shrink-0">
          <svg class="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3" class="ring-track"/>
            <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3"
              stroke-linecap="round" class="ring-fill"
              stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/>
          </svg>
          <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400">${pct}%</span>
        </div>
      </div>
      <div class="mt-3 space-y-1.5 pl-10">
        <p class="text-xs text-slate-600 dark:text-slate-400">
          <span class="font-semibold text-slate-700 dark:text-slate-300">R/C:</span> ${diag.rc}
        </p>
        <p class="text-xs text-slate-600 dark:text-slate-400">
          <span class="font-semibold text-slate-700 dark:text-slate-300">M/P:</span> ${diag.mp}
        </p>
        <p class="text-xs text-slate-500 dark:text-slate-500 pt-1.5 border-t border-slate-100 dark:border-slate-800 mt-1">
          ${diag.dominio}
        </p>
      </div>
    `;

    container.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════════════════
// ALERTA ABCDE
// ══════════════════════════════════════════════════════════════════
function renderABCDEAlert(sorted) {
  const alertBox = document.getElementById("priorityAlert");

  const isAB = sorted.some(d => ["A-B","B-C"].includes(d.abcde) && d.prioridad === "Alta");
  const isC  = sorted.some(d => ["C","C-D","C-E","C-D-E"].includes(d.abcde) && d.prioridad === "Alta");
  const isD  = sorted.some(d => d.abcde === "D" && d.prioridad === "Alta");

  const messages = {
    "A-B": "Compromiso respiratorio crítico. Evaluar saturación y patrón ventilatorio de forma inmediata.",
    "C":   "Compromiso hemodinámico detectado. Controlar PA, perfusión y signos de shock.",
    "D":   "Alteración neurológica aguda. Evaluar escala de Glasgow y estado de conciencia.",
  };

  if (isAB || isC || isD) {
    const cat = isAB ? "A-B" : isC ? "C" : "D";
    document.getElementById("abcdeBadge").textContent  = cat;
    document.getElementById("abcdeText").textContent   = messages[cat];
    alertBox.classList.remove("hidden");
  } else {
    alertBox.classList.add("hidden");
  }
}

// ══════════════════════════════════════════════════════════════════
// EVOLUCIÓN PAC PERSONALIZADA CON IA
// ══════════════════════════════════════════════════════════════════
async function generateEvolutionWithAI(sorted, rawText) {
  const evEl  = document.getElementById("generatedEvolution");
  const badge = document.getElementById("aiEvolutionBadge");

  // Datos del paciente (opcionales)
  const nombre = document.getElementById("pacienteNombre")?.value?.trim() || "";
  const edad   = document.getElementById("pacienteEdad")?.value?.trim()   || "";
  const cama   = document.getElementById("pacienteCama")?.value?.trim()   || "";

  // Construir referencia del paciente
  const refPaciente = nombre
    ? `${nombre}${edad ? ", " + edad + " años" : ""}${cama ? " (Cama " + cama + ")" : ""}`
    : edad
      ? `Paciente de ${edad} años${cama ? " (Cama " + cama + ")" : ""}`
      : "el/la paciente";

  // Diagnósticos para el prompt (máximo 3, los más prioritarios)
  const diagsParaPrompt = sorted.slice(0, 3);
  const diagsList = diagsParaPrompt.map((d, i) =>
    `${i+1}. ${d.diagnostico} (NANDA ${d.codigo})\n   Prioridad: ${d.prioridad} | ABCDE: ${d.abcde}\n   R/C sugerido: ${d.rc}\n   M/P sugerido: ${d.mp}`
  ).join("\n");

  // ── Skeleton loading ─────────────────────────────────────────
  evEl.innerHTML = `
    <div class="space-y-2.5">
      <div class="h-3 rounded animate-pulse" style="background: var(--n-100); width: 100%"></div>
      <div class="h-3 rounded animate-pulse" style="background: var(--n-100); width: 85%"></div>
      <div class="h-3 rounded animate-pulse" style="background: var(--n-100); width: 95%"></div>
      <div class="h-3 rounded animate-pulse" style="background: var(--n-100); width: 70%"></div>
      <div class="mt-3 h-3 rounded animate-pulse" style="background: var(--n-100); width: 100%"></div>
      <div class="h-3 rounded animate-pulse" style="background: var(--n-100); width: 80%"></div>
      <div class="h-3 rounded animate-pulse" style="background: var(--n-100); width: 90%"></div>
    </div>
    <p class="text-xs mt-4 flex items-center gap-1.5" style="color: var(--n-500)">
      <svg class="w-3.5 h-3.5 spinner" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      Generando evolución PAC personalizada con IA...
    </p>
  `;

  // ── System prompt clínico argentino ──────────────────────────
  const SYSTEM = `Sos nurseIA, asistente clínico especializado en enfermería argentina.
Redactás evoluciones de enfermería en formato PAC (Proceso de Atención de Cuidados).

REGLAS ABSOLUTAS:
1. Usá ÚNICAMENTE los datos que aparecen en la descripción del enfermero. NUNCA inventes síntomas, causas, antecedentes ni contextos que no estén escritos.
2. El R/C (relación causal) debe basarse SOLO en lo que se menciona. Si no hay causa clara, escribí "r/c causa en estudio" o usá la causa más obvia del texto.
3. Usá el nombre real del paciente si se proporcionó. Nunca uses "el paciente" como pronombre — usá el nombre o "el/la paciente".
4. Lenguaje mixto profesional: "El paciente refiere..." / "La paciente refiere..." para lo subjetivo. "Se constata...", "Se administra...", "Se monitoriza...", "Se posiciona..." para las intervenciones del enfermero.
5. Formato EXACTO — 5 secciones en este orden, cada una en su propia línea:

VALORACIÓN: [descripción clínica usando los datos reales del texto]
DIAGNÓSTICO ENFERMERO: [Nombre diagnóstico] (NANDA XXXXX) r/c [causa real del texto] m/p [manifestaciones reales del texto]
PLANIFICACIÓN (NOC): [objetivo medible y realista para este turno, usando los datos reales]
INTERVENCIÓN (NIC): [acciones concretas de enfermería, en primera persona del plural "Se..."]
EVALUACIÓN: [cómo y cuándo se evaluará la respuesta al tratamiento]

6. Si hay más de un diagnóstico, escribí una sección PAC completa por diagnóstico, separadas con esta línea exacta: ---
7. Máximo 3 diagnósticos. Priorizá los de mayor riesgo para la vida.
8. Nunca uses markdown (no asteriscos, no #). Solo texto plano con las etiquetas de sección.
9. Longitud: cada sección 2-3 oraciones. Conciso y clínico.`;

  const USER = `DESCRIPCIÓN DEL ENFERMERO:
"${rawText}"

REFERENCIA DEL PACIENTE: ${refPaciente}

DIAGNÓSTICOS NANDA DETECTADOS (usá solo los relevantes al texto):
${diagsList}

Generá la evolución PAC personalizada usando EXCLUSIVAMENTE los datos de la descripción del enfermero.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model:      "claude-sonnet-4-6",
        max_tokens: 1200,
        system:     SYSTEM,
        messages:   [{ role: "user", content: USER }]
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error?.message || "Error API");

    const text = data.content?.map(b => b.text || "").join("") || "";

    // Guardar texto plano para copiar/guardar
    if (lastResults) lastResults.evolucionTexto = text;

    // Formatear con colores por sección PAC
    const formatted = text
      .replace(/^(VALORACIÓN:)/gm,
        '<strong class="text-slate-800 dark:text-slate-100 block mt-3 mb-1">$1</strong>')
      .replace(/^(DIAGNÓSTICO ENFERMERO:)/gm,
        '<strong class="block mt-3 mb-1" style="color: var(--n-600)">$1</strong>')
      .replace(/^(PLANIFICACIÓN \(NOC\):)/gm,
        '<strong class="text-blue-700 dark:text-blue-300 block mt-3 mb-1">$1</strong>')
      .replace(/^(INTERVENCIÓN \(NIC\):)/gm,
        '<strong class="text-green-700 dark:text-green-300 block mt-3 mb-1">$1</strong>')
      .replace(/^(EVALUACIÓN:)/gm,
        '<strong class="text-amber-700 dark:text-amber-300 block mt-3 mb-1">$1</strong>')
      .replace(/^---$/gm,
        '<hr class="border-slate-200 dark:border-slate-700 my-5"/>')
      .replace(/\n/g, '<br>');

    evEl.innerHTML = `<div class="pt-1">${formatted}</div>`;

    // Mostrar badge "Personalizada por IA"
    if (badge) {
      badge.classList.remove("hidden");
      badge.classList.add("inline-flex");
    }

  } catch (err) {
    // ── Fallback: evoluciones estáticas de la base NANDA ────────
    console.warn("nurseIA IA fallback:", err.message);

    const key      = isSpanish ? "evolucion_es" : "evolucion_en";
    const fallback = sorted.slice(0, 3).map(d => d[key]).join("\n\n---\n\n");

    evEl.textContent = fallback;
    if (lastResults) lastResults.evolucionTexto = fallback;

    showToast("Sin conexión a la IA — mostrando evolución estándar", "warn");
  }
}

// ══════════════════════════════════════════════════════════════════
// ACCIONES PÚBLICAS
// ══════════════════════════════════════════════════════════════════
export function clearAnalysis() {
  ["evolutionText","pacienteNombre","pacienteEdad","pacienteCama"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const cc = document.getElementById("charCount");
  if (cc) cc.textContent = "0";
  document.getElementById("resultsSection")?.classList.add("hidden");
  document.getElementById("priorityAlert")?.classList.add("hidden");
  const badge = document.getElementById("aiEvolutionBadge");
  if (badge) { badge.classList.add("hidden"); badge.classList.remove("inline-flex"); }
  lastResults = null;
}

export function copyEvolution() {
  // Usar texto plano guardado para evitar copiar HTML
  const text = lastResults?.evolucionTexto
    || document.getElementById("generatedEvolution")?.innerText
    || document.getElementById("generatedEvolution")?.textContent;
  if (!text) return;

  copyToClipboard(text, () => {
    document.getElementById("copyIcon")?.classList.add("hidden");
    document.getElementById("checkIcon")?.classList.remove("hidden");
    document.getElementById("copyText").textContent = "¡Copiado!";
    setTimeout(() => {
      document.getElementById("copyIcon")?.classList.remove("hidden");
      document.getElementById("checkIcon")?.classList.add("hidden");
      document.getElementById("copyText").textContent = "Copiar";
    }, 2000);
  });
}

export function saveAnalysis() {
  const text = lastResults?.evolucionTexto
    || document.getElementById("generatedEvolution")?.innerText
    || document.getElementById("generatedEvolution")?.textContent;
  if (!text) return;

  const history = loadFromStorage("nurseIA_history", []);
  history.unshift({
    id:        generateId(),
    date:      formatDate(Date.now()),
    text,
    diagCount: lastResults?.sorted?.length ?? 0,
  });
  saveToStorage("nurseIA_history", history);
  showToast("Evolución guardada en el historial ✓", "success");
}

export function setLanguage(spanish) {
  isSpanish = spanish;
  // Si hay resultados activos, regenerar con el nuevo idioma
  if (lastResults?.sorted && lastResults?.rawText) {
    generateEvolutionWithAI(lastResults.sorted, lastResults.rawText);
  }
}

// ══════════════════════════════════════════════════════════════════
// HELPERS INTERNOS
// ══════════════════════════════════════════════════════════════════
function setLoading(loading) {
  const btn  = document.getElementById("analyzeBtn");
  const icon = document.getElementById("analyzeIcon");
  const spin = document.getElementById("loadingIcon");
  const txt  = document.getElementById("btnText");
  if (!btn) return;
  btn.disabled = loading;
  icon?.classList.toggle("hidden", loading);
  spin?.classList.toggle("hidden", !loading);
  if (txt) txt.textContent = loading ? "Analizando..." : "Analizar";
}

function showToast(msg, type = "info") {
  const colors = {
    success: "bg-green-600",
    warn:    "bg-amber-500",
    info:    "bg-violet-600",
  };
  const toast = document.createElement("div");
  toast.className = `fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg fade-in ${colors[type] ?? colors.info}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}