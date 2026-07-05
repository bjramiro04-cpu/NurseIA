/**
 * nurseIA — src/components/tabTriage.js
 * Virtual Triage Map — mapa visual de camas y panel lateral de paciente.
 */

import { TRIAGE_DATA } from "../data/triage.js";

// Estado local: cama actualmente seleccionada
let selectedCamaId = null;

// ── HTML del tab ────────────────────────────────────────────────
export function renderTabTriage() {
  return `
    <div id="tab-triage" class="fade-in hidden p-6 space-y-5">

      <!-- Resumen del piso -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center">
          <div class="text-2xl font-bold text-slate-800 dark:text-white" id="mapTotal">—</div>
          <div class="text-xs text-slate-500 mt-0.5">Camas totales</div>
        </div>
        <div class="bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900 p-4 text-center">
          <div class="text-2xl font-bold text-red-600 dark:text-red-400" id="mapCriticos">—</div>
          <div class="text-xs text-red-500 mt-0.5">Críticos 🔴</div>
        </div>
        <div class="bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 p-4 text-center">
          <div class="text-2xl font-bold text-amber-600 dark:text-amber-400" id="mapAlertas">—</div>
          <div class="text-xs text-amber-500 mt-0.5">En observación 🟠</div>
        </div>
        <div class="bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-900 p-4 text-center">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400" id="mapEstables">—</div>
          <div class="text-xs text-green-500 mt-0.5">Estables 🟢</div>
        </div>
      </div>

      <!-- Mapa de camas -->
      <div class="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div class="flex items-start justify-between mb-5 gap-4 flex-wrap">
          <div>
            <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Piso 2 — Internación General</h2>
            <p class="text-xs text-slate-500 mt-0.5">Hacé clic en una cama para ver el detalle del paciente</p>
          </div>
          <!-- Leyenda -->
          <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-sm bg-red-200 border border-red-400 inline-block"></span>Crítico
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-sm bg-orange-100 border border-orange-400 inline-block"></span>Alerta
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-sm bg-green-100 border border-green-400 inline-block"></span>Estable
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-sm border-2 border-dashed border-slate-300 inline-block"></span>Vacía
            </span>
          </div>
        </div>

        <!-- Grid de habitaciones (se rellena en JS) -->
        <div id="triageMapGrid" class="grid grid-cols-2 sm:grid-cols-3 gap-4"></div>
      </div>

      <!-- Panel lateral del paciente (oculto hasta seleccionar una cama) -->
      <div
        id="camaDetailPanel"
        class="hidden max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden fade-in"
      >
        <!-- Header del paciente -->
        <div id="camaDetailHeader" class="flex items-center gap-3 px-5 py-3 border-b border-slate-100 dark:border-slate-800">
          <span id="camaDetailDot" class="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></span>
          <div class="flex-1 min-w-0">
            <p id="camaDetailNombre" class="text-sm font-semibold text-slate-800 dark:text-white truncate"></p>
            <p id="camaDetailMeta" class="text-xs text-slate-500"></p>
          </div>
          <span id="camaDetailBadge" class="px-2 py-0.5 text-xs font-bold rounded-md"></span>
          <button
            onclick="window.nurseIA.closeCamaDetail()"
            class="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Cerrar"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Cuerpo: 3 columnas -->
        <div class="p-5 grid grid-cols-1 sm:grid-cols-3 gap-5">

          <!-- Resumen IA -->
          <div class="sm:col-span-2">
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Resumen IA del turno anterior
            </p>
            <p id="camaDetailIA" class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-violet-50 dark:bg-violet-900/10 rounded-xl p-3 border border-violet-100 dark:border-violet-900/30"></p>
          </div>

          <!-- Alertas NANDA -->
          <div>
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Alertas NANDA activas
            </p>
            <div id="camaDetailNANDA" class="space-y-1.5"></div>
          </div>
        </div>

        <!-- Libreta del turno -->
        <div class="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 pt-4">
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Nota para el próximo turno
          </p>
          <textarea
            id="camaDetailNota"
            rows="2"
            class="w-full text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950
                   border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 resize-none
                   focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            placeholder="Escribí la nota de este turno para el siguiente enfermero..."
          ></textarea>
          <div class="flex items-center justify-end mt-2">
            <button
              onclick="window.nurseIA.saveNota()"
              class="px-4 py-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-700
                     text-white rounded-lg transition-colors"
            >
              Guardar nota
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── Inicializar el mapa ─────────────────────────────────────────
export function initTabTriage() {
  buildMap();
}

// ── Construir el grid de habitaciones ───────────────────────────
function buildMap() {
  const grid = document.getElementById("triageMapGrid");
  if (!grid) return;
  grid.innerHTML = "";

  let total = 0, criticos = 0, alertas = 0, estables = 0;

  TRIAGE_DATA.forEach(hab => {
    const habDiv = document.createElement("div");
    habDiv.className = "bg-slate-50 dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-800";

    habDiv.innerHTML = `
      <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
        Hab. ${hab.hab}
      </p>
      <div class="space-y-2" id="hab-${hab.hab}"></div>
    `;

    hab.camas.forEach(cama => {
      const { cls, dot } = estadoStyles(cama.estado);
      const nombreDisplay = cama.nombre === "——" ? "Vacía" : cama.nombre;
      const isVacia = cama.estado === "vacia";

      const camaEl = document.createElement("div");
      camaEl.className = `cama ${cls} p-2.5 flex items-center gap-2 ${isVacia ? "opacity-60 cursor-default" : ""}`;
      camaEl.id = `cama-${cama.id}`;
      camaEl.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}"></span>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">${nombreDisplay}</p>
          ${cama.edad ? `<p class="text-xs text-slate-500">${cama.edad} años</p>` : ""}
        </div>
      `;

      if (!isVacia) {
        camaEl.onclick = () => showCamaDetail(cama.id);
      }

      habDiv.querySelector(`#hab-${hab.hab}`).appendChild(camaEl);

      total++;
      if (cama.estado === "rojo")    criticos++;
      else if (cama.estado === "naranja") alertas++;
      else if (cama.estado === "verde")   estables++;
    });

    grid.appendChild(habDiv);
  });

  // Actualizar contadores
  document.getElementById("mapTotal").textContent    = total;
  document.getElementById("mapCriticos").textContent = criticos;
  document.getElementById("mapAlertas").textContent  = alertas;
  document.getElementById("mapEstables").textContent = estables;
}

// ── Mostrar detalle de una cama ─────────────────────────────────
function showCamaDetail(camaId) {
  let cama = null;
  TRIAGE_DATA.forEach(h => h.camas.forEach(c => { if (c.id === camaId) cama = c; }));
  if (!cama || cama.estado === "vacia") return;

  selectedCamaId = camaId;

  // Resaltar cama activa
  document.querySelectorAll(".cama").forEach(el => el.classList.remove("ring-2","ring-violet-400"));
  document.getElementById(`cama-${camaId}`)?.classList.add("ring-2","ring-violet-400");

  const { dot: dotCls, badge, badgeCls } = estadoStyles(cama.estado);

  document.getElementById("camaDetailDot").className = `w-3 h-3 rounded-full flex-shrink-0 ${dotCls}`;
  document.getElementById("camaDetailNombre").textContent = `${cama.nombre} — Cama ${cama.id}`;
  document.getElementById("camaDetailMeta").textContent   = `${cama.diagnosticoMedico}${cama.edad ? " · " + cama.edad + " años" : ""}`;
  document.getElementById("camaDetailBadge").textContent  = badge;
  document.getElementById("camaDetailBadge").className    = `px-2 py-0.5 text-xs font-bold rounded-md ${badgeCls}`;
  document.getElementById("camaDetailIA").textContent     = cama.ia || "Sin resumen del turno anterior.";
  document.getElementById("camaDetailNota").value         = cama.nota || "";

  // NANDA pills
  const nandaEl = document.getElementById("camaDetailNANDA");
  nandaEl.innerHTML = cama.nanda.length
    ? cama.nanda.map(n => `
        <div class="text-xs px-2.5 py-1.5 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-lg border border-violet-100 dark:border-violet-900/30 leading-snug">
          ${n}
        </div>
      `).join("")
    : `<p class="text-xs text-slate-400 italic">Sin alertas activas.</p>`;

  const panel = document.getElementById("camaDetailPanel");
  panel.classList.remove("hidden");
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Cerrar panel ────────────────────────────────────────────────
export function closeCamaDetail() {
  document.getElementById("camaDetailPanel")?.classList.add("hidden");
  document.querySelectorAll(".cama").forEach(el => el.classList.remove("ring-2","ring-violet-400"));
  selectedCamaId = null;
}

// ── Guardar nota del turno ──────────────────────────────────────
export function saveNota() {
  const nota = document.getElementById("camaDetailNota")?.value?.trim();
  if (!nota) return;

  // Persistir en los datos en memoria
  TRIAGE_DATA.forEach(h => h.camas.forEach(c => {
    if (c.id === selectedCamaId) c.nota = nota;
  }));

  showTriageToast("Nota guardada para el próximo turno ✓");
}

// ── Estilos por estado de cama ───────────────────────────────────
function estadoStyles(estado) {
  switch (estado) {
    case "rojo":
      return { cls: "cama-rojo", dot: "bg-red-500", badge: "CRÍTICO", badgeCls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" };
    case "naranja":
      return { cls: "cama-naranja", dot: "bg-orange-500", badge: "ALERTA", badgeCls: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" };
    case "verde":
      return { cls: "cama-verde", dot: "bg-green-500", badge: "ESTABLE", badgeCls: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" };
    default:
      return { cls: "cama-vacia", dot: "bg-slate-300", badge: "VACÍA", badgeCls: "bg-slate-100 text-slate-500" };
  }
}

function showTriageToast(msg) {
  const t = document.createElement("div");
  t.className = "fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg fade-in bg-green-600";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}