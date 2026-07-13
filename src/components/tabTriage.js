/**
 * nurseIA — src/components/tabTriage.js
 * Virtual Triage Map CONFIGURABLE
 * El usuario puede agregar/editar/eliminar habitaciones y camas,
 * editar nombre, estado y notas de cada paciente, y guardar la
 * configuración en localStorage para que persista entre sesiones.
 */

import { saveToStorage, loadFromStorage, generateId } from "../utils/helpers.js?v=2";
import { NANDA } from "../data/nanda.js?v=2";
import { buildBedAssessmentUpdate } from "../utils/triageLogic.js?v=2";

// ── Estado del mapa (se carga desde localStorage o usa demo) ──
let triageData = loadFromStorage("nurseIA_triage", null) || getDefaultData();
let selectedCamaId = null;
let editingHabId    = null;

// ── Datos de demo para la primera vez ────────────────────────
function getDefaultData() {
  return [
    {
      id: "hab-101", hab: "101",
      camas: [
        { id: "101A", nombre: "García, Roberto",  estado: "rojo",    edad: 78, dx: "Neumonía bilateral",       ia: "Fiebre 38.8°C a las 03:20 hs. Inició ceftriaxona IV. Desorientación nocturna.", nota: "", nanda: ["00032 Patrón resp. ineficaz","00155 Riesgo de caída"] },
        { id: "101B", nombre: "López, María",     estado: "verde",   edad: 65, dx: "Post-QX colecistectomía",  ia: "Estable. Toleró dieta líquida. Herida sin signos de infección.", nota: "", nanda: ["00093 Fatiga"] },
      ]
    },
    {
      id: "hab-102", hab: "102",
      camas: [
        { id: "102A", nombre: "Martínez, Ana",    estado: "naranja", edad: 54, dx: "Fractura de cadera",       ia: "Dolor 6/10 al movilizarse. Analgesia a las 06:00 con respuesta parcial.", nota: "", nanda: ["00132 Dolor agudo","00146 Ansiedad"] },
        { id: "102B", nombre: "",                 estado: "vacia",   edad: null, dx: "", ia: "", nota: "", nanda: [] },
      ]
    },
    {
      id: "hab-103", hab: "103",
      camas: [
        { id: "103A", nombre: "Rodríguez, Carlos",estado: "verde",   edad: 70, dx: "ACV isquémico rehab",      ia: "Fisioterapia 40 min. Deambula con andador. Sin novedades neurológicas.", nota: "", nanda: ["00085 Deterioro movilidad"] },
        { id: "103B", nombre: "Fernández, Laura", estado: "verde",   edad: 48, dx: "DBT descompensada",        ia: "Glucemias 140-180. Durmió mal. Sin alteraciones clínicas.", nota: "", nanda: ["00179 Riesgo glucemia"] },
      ]
    },
    {
      id: "hab-104", hab: "104",
      camas: [
        { id: "104A", nombre: "Sánchez, Pedro",   estado: "rojo",    edad: 82, dx: "EPOC exacerbado",          ia: "SpO2 88%. Escaló O2 a mascarilla 8L. Secreciones abundantes. No dejar solo.", nota: "", nanda: ["00030 Intercambio gaseoso","00031 Limpieza vía aérea"] },
        { id: "104B", nombre: "Torres, Jorge",    estado: "naranja", edad: 61, dx: "DBT tipo 1",               ia: "Glucemia 280 mg/dL. Corrección con insulina. Recontrol en 2 hs.", nota: "", nanda: ["00179 Riesgo glucemia"] },
      ]
    },
    {
      id: "hab-105", hab: "105",
      camas: [
        { id: "105A", nombre: "",                 estado: "vacia",   edad: null, dx: "", ia: "", nota: "", nanda: [] },
        { id: "105B", nombre: "Díaz, Elena",      estado: "verde",   edad: 38, dx: "Anemia ferropénica",       ia: "Ingesta mejorada. Completó 70% del almuerzo. Solicita nutricionista.", nota: "", nanda: ["00002 Desequilibrio nutricional"] },
      ]
    },
    {
      id: "hab-106", hab: "106",
      camas: [
        { id: "106A", nombre: "Morales, Verónica",estado: "naranja", edad: 75, dx: "Hipotermia accidental",    ia: "T° 35.2°C al ingreso. Manta térmica. Ascenso a 36.1°C. Paciente ansiosa.", nota: "", nanda: ["00006 Hipotermia","00146 Ansiedad"] },
        { id: "106B", nombre: "Jiménez, Ricardo", estado: "verde",   edad: 55, dx: "HTA controlada",           ia: "Alta programada mañana. PA 130/80. Educación al egreso realizada.", nota: "", nanda: ["00155 Riesgo de caída"] },
      ]
    },
  ];
}

// ── Guardar en localStorage ───────────────────────────────────
function saveData() {
  saveToStorage("nurseIA_triage", triageData);
}

// ── Contar estados ────────────────────────────────────────────
function countStats() {
  let total = 0, criticos = 0, alertas = 0, estables = 0, vacias = 0;
  triageData.forEach(h => h.camas.forEach(c => {
    total++;
    if (c.estado === "rojo")    criticos++;
    else if (c.estado === "naranja") alertas++;
    else if (c.estado === "verde")   estables++;
    else vacias++;
  }));
  return { total, criticos, alertas, estables, vacias };
}

// ═══════════════════════════════════════════════════════════════
// RENDER PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export function renderTabTriage() {
  return `
    <div id="tab-triage" class="fade-in hidden p-5 space-y-5">

      <!-- ── HEADER CON STATS Y BOTÓN CONFIGURAR ── -->
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 class="text-base font-semibold text-slate-800 dark:text-white">Virtual Triage Map</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Hacé clic en una cama para ver el detalle · Configurá tu piso con el botón</p>
          </div>
          <button
            onclick="window.nurseIA.openTriageConfig()"
            class="btn-nurseia text-sm"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Configurar piso
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3" id="triageStats"></div>
      </div>

      <!-- ── MAPA DE CAMAS ── -->
      <div class="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5" style="box-shadow: var(--shadow-md)">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider" id="mapFloorName">Piso</div>
          <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-red-200 border border-red-400 inline-block"></span>Crítico</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-orange-100 border border-orange-400 inline-block"></span>Alerta</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-green-100 border border-green-400 inline-block"></span>Estable</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm border-2 border-dashed border-slate-300 inline-block"></span>Vacía</span>
          </div>
        </div>
        <div id="triageMapGrid" class="grid grid-cols-2 sm:grid-cols-3 gap-4"></div>
      </div>

      <!-- ── PANEL LATERAL PACIENTE ── -->
      <div id="camaDetailPanel" class="hidden max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden slide-right" style="box-shadow: var(--shadow-md)">

        <!-- Header paciente -->
        <div id="camaDetailHeader" class="flex items-center gap-3 px-5 py-3 border-b border-slate-100 dark:border-slate-800">
          <span id="camaDetailDot" class="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></span>
          <div class="flex-1 min-w-0">
            <p id="camaDetailNombre" class="text-sm font-semibold text-slate-800 dark:text-white truncate"></p>
            <p id="camaDetailMeta" class="text-xs text-slate-500"></p>
          </div>
          <span id="camaDetailBadge" class="px-2 py-0.5 text-xs font-bold rounded-md"></span>
          <button
            onclick="window.nurseIA.openCamaEdit()"
            class="flex-shrink-0 text-slate-400 hover:text-violet-600 transition-colors p-1"
            title="Editar paciente"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button
            onclick="window.nurseIA.closeCamaDetail()"
            class="flex-shrink-0 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Cuerpo: 3 columnas -->
        <div class="p-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div class="sm:col-span-2">
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Resumen IA del turno anterior</p>
            <p id="camaDetailIA" class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed rounded-xl p-3 border border-slate-100 dark:border-slate-800" style="background: var(--n-50)"></p>
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Alertas NANDA</p>
            <div id="camaDetailNANDA" class="space-y-1.5"></div>
          </div>
        </div>

        <!-- Libreta del turno -->
        <div class="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 pt-4">
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Nota para el próximo turno</p>
          <textarea
            id="camaDetailNota"
            rows="2"
            class="w-full text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 resize-none focus:outline-none transition-all"
            style="focus-outline: none;"
            placeholder="Escribí la nota de este turno para el siguiente enfermero..."
            onfocus="this.style.borderColor='var(--n-400)'; this.style.boxShadow='0 0 0 3px rgba(91,44,145,0.1)'"
            onblur="this.style.borderColor=''; this.style.boxShadow=''"
          ></textarea>
          <div class="flex justify-end mt-2">
            <button onclick="window.nurseIA.saveNota()" class="btn-nurseia text-xs py-1.5 px-4">
              Guardar nota
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- ══════════════════════════════════════════════════════ -->
    <!-- MODAL CONFIGURAR PISO                                 -->
    <!-- ══════════════════════════════════════════════════════ -->
    <div id="triageConfigModal" class="triage-modal-overlay hidden">
      <div class="triage-modal">

        <div class="triage-modal-header">
          <div>
            <h3 class="text-base font-semibold text-slate-800 dark:text-white">Configurar piso</h3>
            <p class="text-xs text-slate-500 mt-0.5">Editá habitaciones, camas y estados</p>
          </div>
          <button onclick="window.nurseIA.closeTriageConfig()" class="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="p-5 space-y-4">

          <!-- Nombre del piso -->
          <div>
            <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Nombre del piso</label>
            <input
              type="text"
              id="floorNameInput"
              class="triage-input w-full"
              placeholder="Ej: Piso 2 — Internación General"
            />
          </div>

          <!-- Lista de habitaciones -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Habitaciones</label>
              <button onclick="window.nurseIA.addHab()" class="btn-nurseia-outline text-xs py-1 px-3">
                + Agregar hab.
              </button>
            </div>
            <div id="habConfigList" class="space-y-2 max-h-96 overflow-y-auto pr-1"></div>
          </div>

          <!-- Botones -->
          <div class="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onclick="window.nurseIA.resetTriageToDefault()"
              class="text-xs text-red-500 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Restaurar demo
            </button>
            <div class="flex gap-2">
              <button onclick="window.nurseIA.closeTriageConfig()" class="btn-nurseia-outline text-sm">Cancelar</button>
              <button onclick="window.nurseIA.saveTriageConfig()" class="btn-nurseia text-sm">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════ -->
    <!-- MODAL EDITAR PACIENTE/CAMA                            -->
    <!-- ══════════════════════════════════════════════════════ -->
    <div id="camaEditModal" class="triage-modal-overlay hidden">
      <div class="triage-modal">
        <div class="triage-modal-header">
          <h3 class="text-base font-semibold text-slate-800 dark:text-white">Editar paciente</h3>
          <button onclick="window.nurseIA.closeCamaEdit()" class="text-slate-400 hover:text-slate-700 p-1 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="p-5 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Nombre del paciente</label>
              <input type="text" id="editNombre" class="triage-input w-full" placeholder="Apellido, Nombre"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Edad</label>
              <input type="number" id="editEdad" class="triage-input w-full" placeholder="Ej: 75" min="0" max="120"/>
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Diagnóstico médico</label>
            <input type="text" id="editDx" class="triage-input w-full" placeholder="Ej: Neumonía bilateral"/>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Estado</label>
            <div class="flex items-center gap-2">
              <select id="editEstado" class="estado-select w-full" disabled title="El estado se actualiza automáticamente según la valoración">
                <option value="rojo">🔴 Crítico</option>
                <option value="naranja">🟠 En observación</option>
                <option value="verde">🟢 Estable</option>
                <option value="vacia">⚪ Vacía</option>
              </select>
              <div class="text-xs text-slate-400 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 whitespace-nowrap" title="El estado se calcula automáticamente">
                Auto
              </div>
            </div>
            <p class="text-xs text-slate-400 mt-1 italic">Nota: El estado se actualiza automáticamente basado en la valoración ingresada.</p>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Resumen IA / Nota del turno anterior</label>
            <textarea id="editIA" rows="3" class="triage-input w-full resize-none" placeholder="Describí el estado del paciente al inicio del turno..."></textarea>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Alertas NANDA (una por línea)</label>
            <textarea id="editNANDA" rows="3" class="triage-input w-full resize-none font-mono text-xs" placeholder="00032 Patrón resp. ineficaz&#10;00155 Riesgo de caída"></textarea>
          </div>
          <div class="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button onclick="window.nurseIA.closeCamaEdit()" class="btn-nurseia-outline text-sm">Cancelar</button>
            <button onclick="window.nurseIA.saveCamaEdit()" class="btn-nurseia text-sm">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
export function initTabTriage() {
  buildMap();
}

// ═══════════════════════════════════════════════════════════════
// CONSTRUIR EL MAPA
// ═══════════════════════════════════════════════════════════════
function buildMap() {
  const grid = document.getElementById("triageMapGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const stats = countStats();

  // Stats header
  const statsEl = document.getElementById("triageStats");
  if (statsEl) {
    statsEl.innerHTML = [
      { val: stats.total,    label: "Total camas",    bg: "bg-white dark:bg-slate-900", text: "text-slate-800 dark:text-white", border: "border-slate-200 dark:border-slate-800" },
      { val: stats.criticos, label: "Críticos 🔴",    bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-600 dark:text-red-400", border: "border-red-200 dark:border-red-900" },
      { val: stats.alertas,  label: "Observación 🟠", bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-600 dark:text-amber-400", border: "border-amber-200 dark:border-amber-900" },
      { val: stats.estables, label: "Estables 🟢",    bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-900" },
      { val: stats.vacias,   label: "Vacías ⚪",      bg: "bg-slate-50 dark:bg-slate-900", text: "text-slate-500 dark:text-slate-400", border: "border-slate-200 dark:border-slate-800" },
    ].map(s => `
      <div class="${s.bg} rounded-xl border ${s.border} p-3 text-center" style="box-shadow: var(--shadow-sm)">
        <div class="text-2xl font-bold ${s.text}">${s.val}</div>
        <div class="text-xs text-slate-500 mt-0.5">${s.label}</div>
      </div>
    `).join("");
  }

  // Nombre del piso
  const floorName = loadFromStorage("nurseIA_floorName", "Piso 2 — Internación General");
  const mapFloorName = document.getElementById("mapFloorName");
  if (mapFloorName) mapFloorName.textContent = floorName;

  // Habitaciones
  triageData.forEach(hab => {
    const habDiv = document.createElement("div");
    habDiv.className = "bg-slate-50 dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-800";
    habDiv.innerHTML = `
      <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Hab. ${hab.hab}</p>
      <div class="space-y-2" id="grid-hab-${hab.id}"></div>
    `;

    hab.camas.forEach(cama => {
      const { cls, dot } = estadoStyle(cama.estado);
      const nombre = cama.nombre || "Vacía";
      const isVacia = cama.estado === "vacia" || !cama.nombre;

      const camaEl = document.createElement("div");
      camaEl.id = `cama-el-${cama.id}`;
      camaEl.className = `cama ${cls} p-2.5 flex items-center gap-2 ${isVacia ? "opacity-60" : ""}`;
      camaEl.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}"></span>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">${nombre}</p>
          ${cama.edad ? `<p class="text-xs text-slate-500">${cama.edad} años</p>` : ""}
        </div>
      `;

      if (!isVacia) {
        camaEl.onclick = () => showCamaDetail(cama.id);
      }

      habDiv.querySelector(`#grid-hab-${hab.id}`).appendChild(camaEl);
    });

    grid.appendChild(habDiv);
  });
}

// ═══════════════════════════════════════════════════════════════
// PANEL LATERAL — VER PACIENTE
// ═══════════════════════════════════════════════════════════════
function showCamaDetail(camaId) {
  let cama = findCama(camaId);
  if (!cama || cama.estado === "vacia" || !cama.nombre) return;

  selectedCamaId = camaId;

  // Highlight cama activa
  document.querySelectorAll(".cama").forEach(el => el.classList.remove("selected"));
  document.getElementById(`cama-el-${camaId}`)?.classList.add("selected");

  const { dot, badge, badgeCls } = estadoStyle(cama.estado);

  document.getElementById("camaDetailDot").className    = `w-3 h-3 rounded-full flex-shrink-0 bg-${dotColor(cama.estado)}`;
  document.getElementById("camaDetailNombre").textContent = `${cama.nombre} — Cama ${cama.id}`;
  document.getElementById("camaDetailMeta").textContent   = `${cama.dx || "Sin diagnóstico"}${cama.edad ? " · " + cama.edad + " años" : ""}`;
  document.getElementById("camaDetailBadge").textContent  = badge;
  document.getElementById("camaDetailBadge").className    = `px-2 py-0.5 text-xs font-bold rounded-md ${badgeCls}`;
  document.getElementById("camaDetailIA").textContent     = cama.ia || "Sin resumen del turno anterior.";
  document.getElementById("camaDetailNota").value         = cama.nota || "";

  const nandaEl = document.getElementById("camaDetailNANDA");
  nandaEl.innerHTML = cama.nanda?.length
    ? cama.nanda.map(n => `
        <div class="text-xs px-2.5 py-1.5 rounded-lg border leading-snug"
             style="background: var(--n-50); color: var(--n-600); border-color: var(--n-100)">
          ${n}
        </div>
      `).join("")
    : `<p class="text-xs text-slate-400 italic">Sin alertas activas.</p>`;

  const panel = document.getElementById("camaDetailPanel");
  panel.classList.remove("hidden");
  setTimeout(() => panel.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
}

export function closeCamaDetail() {
  document.getElementById("camaDetailPanel")?.classList.add("hidden");
  document.querySelectorAll(".cama").forEach(el => el.classList.remove("selected"));
  selectedCamaId = null;
}

export function saveNota() {
  const nota = document.getElementById("camaDetailNota")?.value?.trim();
  if (!nota || !selectedCamaId) return;
  const cama = findCama(selectedCamaId);
  if (cama) { cama.nota = nota; saveData(); }
  showToast("Nota guardada para el próximo turno ✓");
}

// ═══════════════════════════════════════════════════════════════
// MODAL EDITAR CAMA/PACIENTE
// ═══════════════════════════════════════════════════════════════
export function openCamaEdit() {
  if (!selectedCamaId) return;
  const cama = findCama(selectedCamaId);
  if (!cama) return;

  document.getElementById("editNombre").value  = cama.nombre || "";
  document.getElementById("editEdad").value    = cama.edad || "";
  document.getElementById("editDx").value      = cama.dx || "";
  document.getElementById("editEstado").value  = cama.estado || "vacia";
  document.getElementById("editIA").value      = cama.ia || "";
  document.getElementById("editNANDA").value   = (cama.nanda || []).join("\n");

  document.getElementById("camaEditModal").classList.remove("hidden");
}

export function closeCamaEdit() {
  document.getElementById("camaEditModal")?.classList.add("hidden");
}

export function saveCamaEdit() {
  if (!selectedCamaId) return;
  const cama = findCama(selectedCamaId);
  if (!cama) return;

  const nombre  = document.getElementById("editNombre").value.trim();
  const edad    = parseInt(document.getElementById("editEdad").value) || null;
  const dx      = document.getElementById("editDx").value.trim();
  const iaText  = document.getElementById("editIA").value.trim();

  // Actualizar campos básicos
  cama.nombre = nombre;
  cama.edad = edad;
  cama.dx = dx;

  // Si hay valoración ingresada, analizar automáticamente contra NANDA
  if (iaText && NANDA && NANDA.length > 0) {
    try {
      const result = buildBedAssessmentUpdate(iaText, cama, NANDA);
      cama.ia = result.ia;
      cama.nanda = result.nanda || [];
      cama.estado = result.estado; // Se actualiza automáticamente sin edición manual
    } catch (e) {
      console.error("Error al analizar valoración:", e);
      cama.ia = iaText;
    }
  } else {
    // Si no hay valoración, solo guardar el texto
    cama.ia = iaText;
  }

  saveData();
  closeCamaEdit();
  buildMap();
  showCamaDetail(selectedCamaId);
  showToast("Paciente actualizado ✓");
}

// ═══════════════════════════════════════════════════════════════
// MODAL CONFIGURAR PISO
// ═══════════════════════════════════════════════════════════════
export function openTriageConfig() {
  // Cargar nombre del piso
  const floorName = loadFromStorage("nurseIA_floorName", "Piso 2 — Internación General");
  document.getElementById("floorNameInput").value = floorName;

  renderHabConfigList();
  document.getElementById("triageConfigModal").classList.remove("hidden");
}

export function closeTriageConfig() {
  document.getElementById("triageConfigModal")?.classList.add("hidden");
}

function renderHabConfigList() {
  const list = document.getElementById("habConfigList");
  if (!list) return;

  list.innerHTML = triageData.map(hab => `
    <div class="bg-slate-50 dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-800">

      <!-- Header habitación -->
      <div class="hab-config-row border-b-0 pb-2 mb-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">Hab.</span>
        <input
          type="text"
          value="${hab.hab}"
          onchange="window.nurseIA.updateHabNum('${hab.id}', this.value)"
          class="triage-input w-20 text-center font-semibold"
          placeholder="101"
        />
        <span class="flex-1 text-xs text-slate-400">${hab.camas.length} cama${hab.camas.length !== 1 ? "s" : ""}</span>
        <button
          onclick="window.nurseIA.addCamaToHab('${hab.id}')"
          class="text-xs text-violet-600 hover:text-violet-800 px-2 py-1 rounded hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
        >+ Cama</button>
        <button
          onclick="window.nurseIA.removeHab('${hab.id}')"
          class="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >✕ Hab.</button>
      </div>

      <!-- Camas -->
      <div class="space-y-1.5 pl-2">
        ${hab.camas.map(cama => `
          <div class="hab-config-row">
            <span class="text-xs text-slate-400 w-16 font-mono">${cama.id}</span>
            <input
              type="text"
              value="${cama.nombre || ""}"
              onchange="window.nurseIA.updateCamaField('${cama.id}', 'nombre', this.value)"
              class="triage-input flex-1 text-xs"
              placeholder="Apellido, Nombre"
            />
            <select
              onchange="window.nurseIA.updateCamaField('${cama.id}', 'estado', this.value)"
              class="estado-select"
            >
              <option value="rojo"    ${cama.estado === "rojo"    ? "selected" : ""}>🔴 Crítico</option>
              <option value="naranja" ${cama.estado === "naranja" ? "selected" : ""}>🟠 Alerta</option>
              <option value="verde"   ${cama.estado === "verde"   ? "selected" : ""}>🟢 Estable</option>
              <option value="vacia"   ${cama.estado === "vacia"   ? "selected" : ""}>⚪ Vacía</option>
            </select>
            <button
              onclick="window.nurseIA.removeCama('${hab.id}', '${cama.id}')"
              class="text-slate-400 hover:text-red-500 transition-colors p-1"
              title="Eliminar cama"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

export function saveTriageConfig() {
  const floorName = document.getElementById("floorNameInput").value.trim()
    || "Piso 2 — Internación General";
  saveToStorage("nurseIA_floorName", floorName);
  saveData();
  closeTriageConfig();
  buildMap();
  showToast("Configuración guardada ✓");
}

// ── Agregar habitación ────────────────────────────────────────
export function addHab() {
  const nextNum = triageData.length + 101;
  triageData.push({
    id: "hab-" + generateId(),
    hab: String(nextNum),
    camas: [
      { id: nextNum + "A", nombre: "", estado: "vacia", edad: null, dx: "", ia: "", nota: "", nanda: [] },
      { id: nextNum + "B", nombre: "", estado: "vacia", edad: null, dx: "", ia: "", nota: "", nanda: [] },
    ]
  });
  renderHabConfigList();
}

// ── Eliminar habitación ───────────────────────────────────────
export function removeHab(habId) {
  if (triageData.length <= 1) { showToast("Debe haber al menos una habitación", "warn"); return; }
  triageData = triageData.filter(h => h.id !== habId);
  renderHabConfigList();
}

// ── Agregar cama a una habitación ────────────────────────────
export function addCamaToHab(habId) {
  const hab = triageData.find(h => h.id === habId);
  if (!hab) return;
  const letter = String.fromCharCode(65 + hab.camas.length); // A, B, C...
  hab.camas.push({
    id: hab.hab + letter,
    nombre: "", estado: "vacia", edad: null, dx: "", ia: "", nota: "", nanda: []
  });
  renderHabConfigList();
}

// ── Eliminar cama ─────────────────────────────────────────────
export function removeCama(habId, camaId) {
  const hab = triageData.find(h => h.id === habId);
  if (!hab || hab.camas.length <= 1) { showToast("Debe haber al menos una cama por habitación", "warn"); return; }
  hab.camas = hab.camas.filter(c => c.id !== camaId);
  renderHabConfigList();
}

// ── Actualizar número de habitación ──────────────────────────
export function updateHabNum(habId, newNum) {
  const hab = triageData.find(h => h.id === habId);
  if (hab) hab.hab = newNum.trim();
}

// ── Actualizar campo de una cama ──────────────────────────────
export function updateCamaField(camaId, field, value) {
  const cama = findCama(camaId);
  if (cama) cama[field] = value;
}

// ── Resetear a datos demo ─────────────────────────────────────
export function resetTriageToDefault() {
  if (!confirm("¿Restaurar el mapa de demo? Se perderán todos los cambios.")) return;
  triageData = getDefaultData();
  saveData();
  renderHabConfigList();
  showToast("Mapa restaurado al demo ✓");
}

// ── Helpers ───────────────────────────────────────────────────
function findCama(camaId) {
  for (const hab of triageData) {
    const c = hab.camas.find(c => c.id === camaId);
    if (c) return c;
  }
  return null;
}

function dotColor(estado) {
  return { rojo:"red-500", naranja:"orange-500", verde:"green-500" }[estado] || "slate-300";
}

function estadoStyle(estado) {
  switch (estado) {
    case "rojo":    return { cls:"cama-rojo",    dot:"bg-red-500",    badge:"CRÍTICO", badgeCls:"bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" };
    case "naranja": return { cls:"cama-naranja", dot:"bg-orange-500", badge:"ALERTA",  badgeCls:"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" };
    case "verde":   return { cls:"cama-verde",   dot:"bg-green-500",  badge:"ESTABLE", badgeCls:"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" };
    default:        return { cls:"cama-vacia",   dot:"bg-slate-300",  badge:"VACÍA",   badgeCls:"bg-slate-100 text-slate-500" };
  }
}

function showToast(msg, type = "success") {
  const colors = { success:"var(--n-600)", warn:"#f59e0b", error:"#ef4444" };
  const t = document.createElement("div");
  t.className = "fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-white text-sm font-medium fade-in";
  t.style.cssText = `background:${colors[type] || colors.success}; box-shadow: var(--shadow-md);`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}