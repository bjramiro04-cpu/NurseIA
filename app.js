/**
 * nurseIA — src/app.js
 * Orquestador principal: monta la app, controla tabs y estado global.
 */

import { renderSidebar, toggleSidebar, restoreSidebar, setActiveNav } from "./src/components/sidebar.js?v=2";
import { renderTabAnalisis, initTabAnalisis, analyze, clearAnalysis, copyEvolution, saveAnalysis, setLanguage } from "./src/components/tabAnalisis.js?v=2";
import {
  renderTabTriage, initTabTriage,
  closeCamaDetail, saveNota,
  openCamaEdit, closeCamaEdit, saveCamaEdit,
  openTriageConfig, closeTriageConfig, saveTriageConfig,
  addHab, removeHab, addCamaToHab, removeCama,
  updateHabNum, updateCamaField, resetTriageToDefault,
} from "./src/components/tabTriage.js?v=2";
import { renderTabAsistente, sendChat, quickPrompt } from "./src/components/tabAsistente.js?v=2";
import { renderTabHistorial, initTabHistorial, renderHistoryList, restoreHistory, deleteHistoryEntry, copyHistoryEntry, clearHistory } from "./src/components/tabHistorial.js?v=2";
import { loadFromStorage, saveToStorage } from "./src/utils/helpers.js?v=2";

// ── Estado global ────────────────────────────────────────────────
let currentTab = "analisis";
let isSpanish  = true;

// ── Configuración de cada tab ────────────────────────────────────
const TABS = {
  analisis:  { title: "Análisis Clínico",  sub: "Diagnósticos NANDA · Priorización ABCDE" },
  triage:    { title: "Mapa de Triaje",    sub: "Virtual Triage Map · Estado del piso en tiempo real" },
  asistente: { title: "Asistente IA",      sub: "Consultá cualquier duda clínica con IA" },
  historial: { title: "Historial",         sub: "Evoluciones guardadas de este turno" },
};

// ── Bootstrap: monta toda la UI ──────────────────────────────────
function mount() {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = `
    <div class="flex h-screen overflow-hidden">

      <!-- Sidebar -->
      ${renderSidebar()}

      <!-- Contenido principal -->
      <div class="flex-1 flex flex-col overflow-hidden min-w-0" id="mainArea">

        <!-- Header -->
        <header class="h-16 flex-shrink-0 bg-white dark:bg-slate-900
                       border-b border-slate-200 dark:border-slate-800
                       flex items-center justify-between px-6">
          <div>
            <h1 id="pageTitle"
                class="text-base font-semibold text-slate-900 dark:text-white leading-tight">
              Análisis Clínico
            </h1>
            <p id="pageSubtitle"
               class="text-xs text-slate-500 dark:text-slate-400">
              Diagnósticos NANDA · Priorización ABCDE
            </p>
          </div>

          <!-- Badge de estado -->
          <div class="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20
                      text-green-700 dark:text-green-400 text-xs font-medium rounded-full
                      border border-green-200 dark:border-green-800">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            Online
          </div>
        </header>

        <!-- Área de scroll con todos los tabs -->
        <main class="flex-1 overflow-y-auto" id="tabContainer">
          ${renderTabAnalisis()}
          ${renderTabTriage()}
          ${renderTabAsistente()}
          ${renderTabHistorial()}
        </main>

      </div>
    </div>
  `;

  // Inicializar cada módulo
  initTabAnalisis();
  initTabTriage();
  initTabHistorial();

  // Restaurar preferencias guardadas
  applyDarkMode();
  restoreSidebar();

  // Mostrar el tab inicial
  showTab("analisis");
}

// ── Navegación entre tabs ────────────────────────────────────────
function showTab(tab) {
  // Ocultar todos los tabs
  Object.keys(TABS).forEach(t => {
    document.getElementById(`tab-${t}`)?.classList.add("hidden");
  });

  // Mostrar el seleccionado
  const el = document.getElementById(`tab-${tab}`);
  if (el) {
    el.classList.remove("hidden");
    // Re-aplicar animación
    el.classList.remove("fade-in");
    void el.offsetWidth; // reflow
    el.classList.add("fade-in");
  }

  // Actualizar header
  const cfg = TABS[tab];
  if (cfg) {
    document.getElementById("pageTitle").textContent    = cfg.title;
    document.getElementById("pageSubtitle").textContent = cfg.sub;
  }

  // Actualizar nav activo
  setActiveNav(tab);

  // Acciones específicas por tab
  if (tab === "historial") renderHistoryList();

  currentTab = tab;
}

// ── Dark mode ────────────────────────────────────────────────────
function toggleDark() {
  document.documentElement.classList.toggle("dark");
  saveToStorage("nurseIA_dark", document.documentElement.classList.contains("dark"));
}

function applyDarkMode() {
  const saved = loadFromStorage("nurseIA_dark", false);
  // También detectar preferencia del sistema operativo
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved || (saved === null && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
}

// ── Idioma ───────────────────────────────────────────────────────
function toggleLang() {
  isSpanish = !isSpanish;
  const label = document.getElementById("langLabel");
  if (label) label.textContent = isSpanish ? "Español" : "English";
  setLanguage(isSpanish);
}

// ── Exponer API global (usada desde onclick en el HTML) ──────────
window.nurseIA = {
  showTab,
  toggleDark,
  toggleLang,
  toggleSidebar,

  // Análisis clínico
  analyze,
  clearAnalysis,
  copyEvolution,
  saveAnalysis,

  // Triage — navegación
  closeCamaDetail,
  saveNota,

  // Triage — editar paciente
  openCamaEdit,
  closeCamaEdit,
  saveCamaEdit,

  // Triage — configurar piso
  openTriageConfig,
  closeTriageConfig,
  saveTriageConfig,
  addHab,
  removeHab,
  addCamaToHab,
  removeCama,
  updateHabNum,
  updateCamaField,
  resetTriageToDefault,

  // Asistente IA
  sendChat,
  quickPrompt,

  // Historial
  restoreHistory,
  deleteHistoryEntry,
  copyHistoryEntry,
  clearHistory,
};

// ── Arrancar cuando el DOM esté listo ───────────────────────────
document.addEventListener("DOMContentLoaded", mount);