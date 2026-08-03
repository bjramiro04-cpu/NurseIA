import { create } from "zustand";
import { nanoid } from "nanoid";
import type { Cama, EstadoCama, Habitacion } from "@/types/triage";
import type { NandaDiagnosis } from "@/types/nanda";
import { loadFromStorage, saveToStorage } from "@/services/storage";
import { buildBedAssessmentUpdate } from "@/services/triageAssessment";
import { getDefaultTriageData } from "@/mocks/triageDefault";

const DATA_KEY = "nurseIA_triage";
const FLOOR_KEY = "nurseIA_floorName";
const DEFAULT_FLOOR_NAME = "Piso 2 — Internación General";

export interface CamaEditPayload {
  nombre: string;
  edad: number | null;
  dx: string;
  iaText: string;
}

interface TriageState {
  rooms: Habitacion[];
  floorName: string;
  selectedCamaId: string | null;
  hydrated: boolean;
  hydrate: () => void;
  findCama: (camaId: string) => Cama | null;
  selectCama: (camaId: string) => void;
  closeCamaDetail: () => void;
  saveNota: (nota: string) => void;
  saveCamaEdit: (payload: CamaEditPayload, nanda: NandaDiagnosis[]) => void;
  saveFloorName: (name: string) => void;
  addHab: () => void;
  removeHab: (habId: string) => boolean;
  addCamaToHab: (habId: string) => void;
  removeCama: (habId: string, camaId: string) => boolean;
  updateHabNum: (habId: string, num: string) => void;
  updateCamaField: (camaId: string, field: "nombre" | "estado", value: string) => void;
  resetToDefault: () => void;
}

function persistRooms(rooms: Habitacion[]) {
  saveToStorage(DATA_KEY, rooms);
}

export const useTriageStore = create<TriageState>((set, get) => ({
  rooms: [],
  floorName: DEFAULT_FLOOR_NAME,
  selectedCamaId: null,
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    set({
      rooms: loadFromStorage<Habitacion[] | null>(DATA_KEY, null) ?? getDefaultTriageData(),
      floorName: loadFromStorage(FLOOR_KEY, DEFAULT_FLOOR_NAME),
      hydrated: true,
    });
  },

  findCama: (camaId) => {
    for (const room of get().rooms) {
      const cama = room.camas.find((c) => c.id === camaId);
      if (cama) return cama;
    }
    return null;
  },

  selectCama: (camaId) => set({ selectedCamaId: camaId }),
  closeCamaDetail: () => set({ selectedCamaId: null }),

  saveNota: (nota) =>
    set((state) => {
      if (!state.selectedCamaId) return state;
      const rooms = mapCama(state.rooms, state.selectedCamaId, (c) => ({ ...c, nota }));
      persistRooms(rooms);
      return { rooms };
    }),

  saveCamaEdit: ({ nombre, edad, dx, iaText }, nanda) =>
    set((state) => {
      if (!state.selectedCamaId) return state;
      const rooms = mapCama(state.rooms, state.selectedCamaId, (cama) => {
        const update = iaText ? buildBedAssessmentUpdate(iaText, nanda) : { ia: iaText };
        return { ...cama, nombre, edad, dx, ...update };
      });
      persistRooms(rooms);
      return { rooms };
    }),

  saveFloorName: (name) => {
    const floorName = name.trim() || DEFAULT_FLOOR_NAME;
    saveToStorage(FLOOR_KEY, floorName);
    set({ floorName });
  },

  addHab: () =>
    set((state) => {
      const nextNum = state.rooms.length + 101;
      const room: Habitacion = {
        id: `hab-${nanoid(6)}`,
        hab: String(nextNum),
        camas: [emptyCama(`${nextNum}A`), emptyCama(`${nextNum}B`)],
      };
      const rooms = [...state.rooms, room];
      persistRooms(rooms);
      return { rooms };
    }),

  removeHab: (habId) => {
    const state = get();
    if (state.rooms.length <= 1) return false;
    const rooms = state.rooms.filter((h) => h.id !== habId);
    persistRooms(rooms);
    set({ rooms });
    return true;
  },

  addCamaToHab: (habId) =>
    set((state) => {
      const rooms = state.rooms.map((room) => {
        if (room.id !== habId) return room;
        const letter = String.fromCharCode(65 + room.camas.length);
        return { ...room, camas: [...room.camas, emptyCama(room.hab + letter)] };
      });
      persistRooms(rooms);
      return { rooms };
    }),

  removeCama: (habId, camaId) => {
    const state = get();
    const room = state.rooms.find((h) => h.id === habId);
    if (!room || room.camas.length <= 1) return false;
    const rooms = state.rooms.map((h) =>
      h.id === habId ? { ...h, camas: h.camas.filter((c) => c.id !== camaId) } : h,
    );
    persistRooms(rooms);
    set({ rooms });
    return true;
  },

  updateHabNum: (habId, num) =>
    set((state) => {
      const rooms = state.rooms.map((h) => (h.id === habId ? { ...h, hab: num.trim() } : h));
      persistRooms(rooms);
      return { rooms };
    }),

  updateCamaField: (camaId, field, value) =>
    set((state) => {
      const rooms = mapCama(state.rooms, camaId, (c) => ({
        ...c,
        [field]: field === "estado" ? (value as EstadoCama) : value,
      }));
      persistRooms(rooms);
      return { rooms };
    }),

  resetToDefault: () => {
    const rooms = getDefaultTriageData();
    persistRooms(rooms);
    set({ rooms });
  },
}));

function mapCama(rooms: Habitacion[], camaId: string, update: (cama: Cama) => Cama): Habitacion[] {
  return rooms.map((room) => ({
    ...room,
    camas: room.camas.map((c) => (c.id === camaId ? update(c) : c)),
  }));
}

function emptyCama(id: string): Cama {
  return { id, nombre: "", estado: "vacia", edad: null, dx: "", ia: "", nota: "", nanda: [] };
}
