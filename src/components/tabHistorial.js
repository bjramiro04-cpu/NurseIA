/**
 * nurseIA — src/components/tabHistorial.js
 * Historial de evoluciones guardadas durante el turno.
 */

import { loadFromStorage, saveToStorage, formatDate } from "../utils/helpers.js";

// ── HTML del tab ─────────────────────────────────────────────────
export function renderTabHistorial() {
  return `
    <div id="tab-historial" class="fade-in hidden p-6 max-w-3xl mx-auto">

      <div class="flex items-center justify-between mb-5">
        <div>
          <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Evoluciones guardadas</h2>
          <p class="text-xs text-slate-500 mt-0.5">Se guardan en este navegador. Se borran al cerrar la sesión si usás modo privado.</p>
        </div>
        <button
          onclick="window.nurseIA.clearHistory()"
          class="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400
                 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20
                 transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800"
        >
          Borrar todo
        </button>
      </div>

      <div id="historyList"></div>

    </div>
  `;
}

// ── Inicializar y renderizar la lista ───────────────────────────
export function initTabHistorial() {
  renderHistoryList();
}

// ── Renderizar ítems del historial ───────────────────────────────
export function renderHistoryList() {
  const container = document.getElementById("historyList");
  if (!container) return;

  const history = loadFromStorage("nurseIA_history", []);

  if (!history.length) {
    container.innerHTML = `
      <div class="text-center py-20 text-slate-400 dark:text-slate-600">
        <svg class="w-14 h-14 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm font-medium">Todavía no guardaste ninguna evolución.</p>
        <p class="text-xs mt-1">Analizá un paciente y hacé clic en <strong>Guardar</strong>.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="space-y-3">
      ${history.map(entry => historyCard(entry)).join("")}
    </div>
  `;
}

// ── Tarjeta individual de historial ────────────────────────────
function historyCard(entry) {
  const preview = entry.text?.slice(0, 220) ?? "";
  return `
    <div
      class="history-item bg-white dark:bg-slate-900 rounded-xl border border-slate-200
             dark:border-slate-800 p-4 hover:border-violet-300 dark:hover:border-violet-700
             hover:shadow-md transition-all cursor-pointer"
      onclick="window.nurseIA.restoreHistory('${entry.id}')"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">

          <!-- Meta info -->
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="inline-flex items-center gap-1 text-xs font-semibold
                         text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20
                         px-2 py-0.5 rounded-full border border-violet-200 dark:border-violet-800">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              ${entry.diagCount} diagnóstico${entry.diagCount !== 1 ? "s" : ""}
            </span>
            <span class="text-xs text-slate-400 dark:text-slate-500">${entry.date}</span>
          </div>

          <!-- Preview del texto -->
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            ${preview}${entry.text?.length > 220 ? "…" : ""}
          </p>

        </div>

        <!-- Acciones -->
        <div class="flex flex-col gap-1.5 flex-shrink-0">
          <button
            onclick="event.stopPropagation(); window.nurseIA.deleteHistoryEntry('${entry.id}')"
            title="Eliminar"
            class="w-7 h-7 flex items-center justify-center rounded-lg
                   text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
          <button
            onclick="event.stopPropagation(); window.nurseIA.copyHistoryEntry('${entry.id}')"
            title="Copiar"
            class="w-7 h-7 flex items-center justify-center rounded-lg
                   text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0
                002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Footer hint -->
      <p class="text-xs text-slate-400 dark:text-slate-600 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        Hacé clic para recuperar esta evolución en el módulo de Análisis Clínico →
      </p>
    </div>
  `;
}

// ── Recuperar evolución y abrirla en Análisis ───────────────────
export function restoreHistory(id) {
  const history = loadFromStorage("nurseIA_history", []);
  const entry = history.find(e => e.id === id);
  if (!entry) return;

  // Mostrar la evolución en el tab de análisis
  const evEl = document.getElementById("generatedEvolution");
  const resEl = document.getElementById("resultsSection");
  if (evEl && resEl) {
    evEl.textContent = entry.text;
    resEl.classList.remove("hidden");
    document.getElementById("priorityAlert")?.classList.add("hidden");
    document.getElementById("diagnosesContainer").innerHTML = "";
    document.getElementById("diagCount").textContent = entry.diagCount;
  }

  window.nurseIA.showTab("analisis");
  setTimeout(() => resEl?.scrollIntoView({ behavior: "smooth" }), 150);
}

// ── Eliminar un ítem ────────────────────────────────────────────
export function deleteHistoryEntry(id) {
  let history = loadFromStorage("nurseIA_history", []);
  history = history.filter(e => e.id !== id);
  saveToStorage("nurseIA_history", history);
  renderHistoryList();
}

// ── Copiar texto de un ítem ─────────────────────────────────────
export function copyHistoryEntry(id) {
  const history = loadFromStorage("nurseIA_history", []);
  const entry = history.find(e => e.id === id);
  if (!entry) return;

  navigator.clipboard.writeText(entry.text).then(() => {
    showHistToast("Evolución copiada al portapapeles ✓");
  });
}

// ── Borrar todo el historial ────────────────────────────────────
export function clearHistory() {
  if (!confirm("¿Borrar todo el historial de evoluciones?")) return;
  saveToStorage("nurseIA_history", []);
  renderHistoryList();
}

// ── Toast local ─────────────────────────────────────────────────
function showHistToast(msg) {
  const t = document.createElement("div");
  t.className = "fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg fade-in bg-violet-600";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}