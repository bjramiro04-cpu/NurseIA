import { useEffect } from "react";
import { useUiStore } from "./useUiStore";
import { useHistoryStore } from "./useHistoryStore";
import { useTriageStore } from "./useTriageStore";

/** Hidrata todos los stores persistidos desde localStorage una sola vez, al montar el shell. */
export function useHydrateStores() {
  useEffect(() => {
    useUiStore.getState().hydrate();
    useHistoryStore.getState().hydrate();
    useTriageStore.getState().hydrate();
  }, []);
}
