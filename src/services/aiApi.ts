import type { ChatMessage } from "@/types/chat";
import type { AiNandaDiagnosis, PatientInfo } from "@/types/analysis";

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(data.error ?? "Error de la API de nurseIA");

  return data;
}

/**
 * Identifica los diagnósticos NANDA reales y genera la evolución PAC en una
 * sola llamada. Le pega a `/api/analyze`, que es el único lugar donde se usa
 * la API key de Gemini — nunca se expone en el cliente.
 */
export async function analyzeClinicalText(
  rawText: string,
  patient: PatientInfo,
): Promise<{ diagnoses: AiNandaDiagnosis[]; evolutionText: string }> {
  return postJson("/api/analyze", { rawText, patient });
}

/** Envía el historial completo del chat del Asistente IA a `/api/chat` y devuelve la respuesta. */
export async function sendChatMessage(history: ChatMessage[]): Promise<string> {
  const { text } = await postJson<{ text: string }>("/api/chat", { history });
  return text || "No se obtuvo respuesta.";
}
