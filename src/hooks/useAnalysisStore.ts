import { create } from "zustand";
import toast from "react-hot-toast";
import type { NandaDiagnosis } from "@/types/nanda";
import type { PatientInfo } from "@/types/analysis";
import type { HistoryEntry } from "@/types/history";
import { NANDA } from "@/mocks/nanda";
import { detectAbcdeAlert, findMatchingDiagnoses, sortByPriority, type AbcdeAlert } from "@/services/nandaEngine";
import { normalizeText } from "@/services/text";
import { generateEvolution } from "@/services/aiApi";
import { useHistoryStore } from "./useHistoryStore";

const EMPTY_PATIENT: PatientInfo = { nombre: "", edad: "", cama: "" };

interface AnalysisState {
  patient: PatientInfo;
  rawText: string;
  loading: boolean;
  sorted: NandaDiagnosis[] | null;
  diagCount: number;
  abcdeAlert: AbcdeAlert | null;
  evolutionText: string;
  evolutionLoading: boolean;
  aiGenerated: boolean;
  showResults: boolean;

  setPatientField: (field: keyof PatientInfo, value: string) => void;
  setRawText: (text: string) => void;
  analyze: (isSpanish: boolean) => Promise<void>;
  regenerateEvolution: (isSpanish: boolean) => Promise<void>;
  clear: () => void;
  saveToHistory: () => void;
  restoreFromHistory: (entry: HistoryEntry) => void;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function runAiGeneration(
  sorted: NandaDiagnosis[],
  rawText: string,
  patient: PatientInfo,
  isSpanish: boolean,
  set: (partial: Partial<AnalysisState>) => void,
) {
  set({ evolutionLoading: true });
  try {
    const text = await generateEvolution(rawText, sorted, patient);
    set({ evolutionText: text, aiGenerated: true, evolutionLoading: false });
  } catch (err) {
    console.warn("nurseIA IA fallback:", err instanceof Error ? err.message : err);
    const key = isSpanish ? "evolucion_es" : "evolucion_en";
    const fallback = sorted
      .slice(0, 3)
      .map((d) => d[key])
      .join("\n\n---\n\n");
    set({ evolutionText: fallback, aiGenerated: false, evolutionLoading: false });
    toast.error("Sin conexión a la IA — mostrando evolución estándar");
  }
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

  analyze: async (isSpanish) => {
    const rawText = get().rawText.trim();
    if (!rawText) {
      toast.error("Describí el estado del paciente antes de analizar.");
      return;
    }

    const cleanText = normalizeText(rawText);

    set({ loading: true });
    await sleep(500);
    set({ loading: false });

    const found = findMatchingDiagnoses(NANDA, cleanText);
    if (!found.length) {
      toast.error("No se detectaron patrones clínicos. Describí más síntomas específicos.");
      return;
    }

    const sorted = sortByPriority(found, cleanText);
    set({
      sorted,
      diagCount: sorted.length,
      abcdeAlert: detectAbcdeAlert(sorted),
      showResults: true,
      evolutionText: "",
      aiGenerated: false,
    });

    await runAiGeneration(sorted, rawText, get().patient, isSpanish, set);
  },

  regenerateEvolution: async (isSpanish) => {
    const { sorted, rawText, patient } = get();
    if (!sorted || !rawText) return;
    await runAiGeneration(sorted, rawText, patient, isSpanish, set);
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
