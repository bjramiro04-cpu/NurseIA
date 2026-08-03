/** Guarda datos en localStorage con manejo de errores (ej. modo privado / cuota excedida). */
export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    console.warn(`nurseIA: no se pudo guardar "${key}" en localStorage.`);
    return false;
  }
}

/** Carga datos de localStorage con valor por defecto tipado. */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}
