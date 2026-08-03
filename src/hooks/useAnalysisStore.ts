import { create } from "zustand";
import toast from "react-hot-toast";
import type { AiNandaDiagnosis, PatientInfo } from "@/types/analysis";
import type { HistoryEntry } from "@/types/history";
import { detectAbcdeAlert, type AbcdeAlert } from "@/services/nandaEngine";
import { analyzeClinicalText } from "@/services/aiApi";
import { useHistoryStore } from "./useHistoryStore";

const EMPTY_PATIENT: PatientInfo = { nombre: "", edad: "", cama: "" };

interface AnalysisState {
  patient: PatientInfo;
  rawText: string;
  loading: boolean;
  sorted: AiNandaDiagnosis[] | null;
  diagCount: number;
  abcdeAlert: AbcdeAlert | null;
  evolutionText: string;
  evolutionLoading: boolean;
  aiGenerated: boolean;
  showResults: boolean;

  setPatientField: (field: keyof PatientInfo, value: string) => void;
  setRawText: (text: string) => void;
  analyze: () => Promise<void>;
  clear: () => void;
  saveToHistory: () => void;
  restoreFromHistory: (entry: HistoryEntry) => void;
}

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  patient: EMPTY_PATIENT,
  rawText: "",
  loading: false,
  sorted: null,
  diagCount: 0,
  abcdeAlert: null,
  evolutionText: "",
  evolutionLoading: false,
  aiGenerated: false,
  showResults: false,

  setPatientField: (field, value) =>
    set((state) => ({ patient: { ...state.patient, [field]: value } })),

  setRawText: (rawText) => set({ rawText }),

  analyze: async () => {
    const rawText = get().rawText.trim();
    if (!rawText) {
      toast.error("Describí el estado del paciente antes de analizar.");
      return;
    }

    set({ loading: true, evolutionLoading: true, showResults: false });

    try {
      const { diagnoses, evolutionText } = await analyzeClinicalText(rawText, get().patient);

      if (!diagnoses.length) {
        toast.error("No se detectaron patrones clínicos. Describí más síntomas específicos.");
        set({ loading: false, evolutionLoading: false });
        return;
      }

      set({
        sorted: diagnoses,
        diagCount: diagnoses.length,
        abcdeAlert: detectAbcdeAlert(diagnoses),
        showResults: true,
        evolutionText,
        aiGenerated: true,
        loading: false,
        evolutionLoading: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.warn("nurseIA: error consultando a la IA:", message);
      toast.error("No se pudo contactar a la IA. Verificá tu conexión e intentá de nuevo.");
      set({ loading: false, evolutionLoading: false });
    }
  },

  clear: () =>
    set({
      patient: EMPTY_PATIENT,
      rawText: "",
      sorted: null,
      diagCount: 0,
      abcdeAlert: null,
      evolutionText: "",
      aiGenerated: false,
      showResults: false,
    }),

  saveToHistory: () => {
    const { evolutionText, diagCount } = get();
    if (!evolutionText) return;
    useHistoryStore.getState().add(evolutionText, diagCount);
    toast.success("Evolución guardada en el historial ✓");
  },

  restoreFromHistory: (entry) =>
    set({
      sorted: null,
      diagCount: entry.diagCount,
      abcdeAlert: null,
      evolutionText: entry.text,
      aiGenerated: false,
      showResults: true,
    }),
}));
