import { useEffect } from "react";
import { useUiStore } from "./useUiStore";

/** Sincroniza la clase "dark" del <html> con el estado del store cada vez que cambia. */
export function useApplyDarkMode() {
  const dark = useUiStore((s) => s.dark);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
}
