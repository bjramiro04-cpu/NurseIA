import type { ChatMessage } from "@/types/chat";
import type { NandaDiagnosis } from "@/types/nanda";
import type { PatientInfo } from "@/types/analysis";

interface ApiResponse {
  text?: string;
  error?: string;
}

async function postJson(url: string, body: unknown): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as ApiResponse;
  if (!response.ok) throw new Error(data.error ?? "Error de la API de nurseIA");

  return data.text ?? "";
}

/**
 * Genera la evolución PAC personalizada con IA. Le pega a nuestro propio
 * route handler (`/api/evolution`), que es el único lugar donde se usa la
 * API key de Anthropic — nunca se expone en el cliente.
 */
export async function generateEvolution(
  rawText: string,
  diagnoses: NandaDiagnosis[],
  patient: PatientInfo,
): Promise<string> {
  return postJson("/api/evolution", { rawText, diagnoses, patient });
}

/**
 * Envía el historial completo del chat del Asistente IA a `/api/chat` y
 * devuelve la respuesta generada por el servidor.
 */
export async function sendChatMessage(history: ChatMessage[]): Promise<string> {
  const text = await postJson("/api/chat", { history });
  return text || "No se obtuvo respuesta.";
}
