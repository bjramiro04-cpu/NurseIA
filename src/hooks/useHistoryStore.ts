import { create } from "zustand";
import { nanoid } from "nanoid";
import type { HistoryEntry } from "@/types/history";
import { loadFromStorage, saveToStorage } from "@/services/storage";
import { formatDate } from "@/services/date";

const STORAGE_KEY = "nurseIA_history";

interface HistoryState {
  entries: HistoryEntry[];
  hydrated: boolean;
  hydrate: () => void;
  add: (text: string, diagCount: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  find: (id: string) => HistoryEntry | undefined;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  entries: [],
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    set({ entries: loadFromStorage<HistoryEntry[]>(STORAGE_KEY, []), hydrated: true });
  },

  add: (text, diagCount) =>
    set((state) => {
      const entries = [{ id: nanoid(8), date: formatDate(Date.now()), text, diagCount }, ...state.entries];
      saveToStorage(STORAGE_KEY, entries);
      return { entries };
    }),

  remove: (id) =>
    set((state) => {
      const entries = state.entries.filter((e) => e.id !== id);
      saveToStorage(STORAGE_KEY, entries);
      return { entries };
    }),

  clear: () => {
    saveToStorage(STORAGE_KEY, []);
    set({ entries: [] });
  },

  find: (id) => get().entries.find((e) => e.id === id),
}));
