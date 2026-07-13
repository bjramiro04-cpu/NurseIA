/**
 * nurseIA — src/components/sidebar.js
 * Barra lateral de navegación: logo, tabs, controles globales.
 */

import { saveToStorage, loadFromStorage } from "../utils/helpers.js";

// ── Estado del sidebar ──────────────────────────────────────────
let expanded = true;

// ── Render del HTML del sidebar ─────────────────────────────────
export function renderSidebar() {
  return `
    <aside
      id="sidebar"
      class="flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-40 h-screen"
      style="width: 240px; transition: width 0.28s cubic-bezier(.4,0,.2,1); overflow: hidden;"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-5 h-16 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <div class="w-9 h-9 bg-white/90 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-violet-200">
          <svg class="w-5 h-5 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 3c2.2 2.4 3.5 4.4 3.5 6.8A3.5 3.5 0 0112 13.3a3.5 3.5 0 01-3.5-3.5C8.5 7.4 9.8 5.4 12 3z"/>
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6 14c1.2 1.7 2.8 2.6 6 2.6s4.8-.9 6-2.6"/>
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 17.5c1.2.8 2.3 1.2 4 1.2s2.8-.4 4-1.2"/>
          </svg>
        </div>
        <span id="sideLogoText" class="font-serif text-xl font-semibold sidebar-label tracking-wide">
          <span class="text-white">Nurse</span><span class="text-violet-100"> IA</span>
        </span>
      </div>

      <!-- Nav principal -->
      <nav class="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
        ${navItem("analisis", iconBrain(), "Análisis Clínico")}
        ${navItem("triage",   iconMap(),   "Mapa de Triaje")}
        ${navItem("asistente",iconChat(),  "Asistente IA")}
        ${navItem("historial",iconClock(), "Historial")}
      </nav>

      <!-- Controles globales -->
      <div class="border-t border-slate-200 dark:border-slate-800 p-3 space-y-1 flex-shrink-0">
        <button
          onclick="window.nurseIA.toggleDark()"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span class="block dark:hidden">${iconMoon()}</span>
          <span class="hidden dark:block">${iconSun()}</span>
          <span class="sidebar-label">Modo oscuro</span>
        </button>

        <button
          onclick="window.nurseIA.toggleLang()"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          ${iconGlobe()}
          <span id="langLabel" class="sidebar-label">Español</span>
        </button>

        <button
          onclick="window.nurseIA.toggleSidebar()"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Contraer barra lateral"
        >
          <span id="collapseIconWrap">${iconCollapse()}</span>
          <span class="sidebar-label">Contraer</span>
        </button>
      </div>
    </aside>
  `;
}

// ── Helper: genera un nav item ──────────────────────────────────
function navItem(tab, icon, label) {
  return `
    <button
      id="nav-${tab}"
      onclick="window.nurseIA.showTab('${tab}')"
      class="nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
             text-slate-600 dark:text-slate-400
             hover:bg-violet-50 dark:hover:bg-violet-900/20
             hover:text-violet-700 dark:hover:text-violet-300
             transition-colors"
    >
      ${icon}
      <span class="sidebar-label">${label}</span>
    </button>
  `;
}

// ── Toggle sidebar collapse ─────────────────────────────────────
export function toggleSidebar() {
  expanded = !expanded;
  const sidebar = document.getElementById("sidebar");
  const labels  = document.querySelectorAll(".sidebar-label");
  const icon    = document.getElementById("collapseIconWrap");

  sidebar.style.width = expanded ? "240px" : "72px";
  labels.forEach(l => l.classList.toggle("hidden", !expanded));

  if (icon) {
    icon.innerHTML = expanded ? iconCollapse() : iconExpand();
  }

  saveToStorage("nurseIA_sidebar", expanded);
}

// ── Restaurar estado guardado ───────────────────────────────────
export function restoreSidebar() {
  const saved = loadFromStorage("nurseIA_sidebar", true);
  if (!saved) toggleSidebar();
}

// ── Mark active nav item ────────────────────────────────────────
export function setActiveNav(tab) {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const active = document.getElementById(`nav-${tab}`);
  if (active) active.classList.add("active");
}

// ── SVG Icons ───────────────────────────────────────────────────
const svg = (path, extra = "") =>
  `<svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" ${extra}>${path}</svg>`;

const iconBrain = () => svg(`<path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>`);
const iconMap   = () => svg(`<path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-10l6-3m0 13l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4"/>`);
const iconChat  = () => svg(`<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>`);
const iconClock = () => svg(`<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>`);
const iconMoon  = () => svg(`<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>`);
const iconSun   = () => svg(`<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>`);
const iconGlobe = () => svg(`<path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>`);
const iconCollapse = () => svg(`<path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>`);
const iconExpand   = () => svg(`<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>`);