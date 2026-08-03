import { create } from "zustand";
import { loadFromStorage, saveToStorage } from "@/services/storage";

export type TabId = "analisis" | "triage" | "asistente" | "historial";

interface UiState {
  activeTab: TabId;
  dark: boolean;
  sidebarExpanded: boolean;
  isSpanish: boolean;
  hydrated: boolean;
  hydrate: () => void;
  setActiveTab: (tab: TabId) => void;
  toggleDark: () => void;
  toggleSidebar: () => void;
  toggleLanguage: () => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  activeTab: "analisis",
  dark: false,
  sidebarExpanded: true,
  isSpanish: true,
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    const savedDark = loadFromStorage<boolean | null>("nurseIA_dark", null);
    const prefersDark =
      typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const sidebarExpanded = loadFromStorage("nurseIA_sidebar", true);
    set({
      dark: savedDark ?? prefersDark,
      sidebarExpanded,
      hydrated: true,
    });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleDark: () =>
    set((state) => {
      const dark = !state.dark;
      saveToStorage("nurseIA_dark", dark);
      return { dark };
    }),

  toggleSidebar: () =>
    set((state) => {
      const sidebarExpanded = !state.sidebarExpanded;
      saveToStorage("nurseIA_sidebar", sidebarExpanded);
      return { sidebarExpanded };
    }),

  toggleLanguage: () => set((state) => ({ isSpanish: !state.isSpanish })),
}));
