import type { NandaDiagnosis } from "@/types/nanda";
import type { PatientInfo } from "@/types/analysis";

interface ApiResponse {
  text?: string;
  interactionId?: string;
  error?: string;
}

async function postJson(url: string, body: unknown): Promise<ApiResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as ApiResponse;
  if (!response.ok) throw new Error(data.error ?? "Error de la API de nurseIA");

  return data;
}

/**
 * Genera la evolución PAC personalizada con IA. Le pega a nuestro propio
 * route handler (`/api/evolution`), que es el único lugar donde se usa la
 * API key de Gemini — nunca se expone en el cliente.
 */
export async function generateEvolution(
  rawText: string,
  diagnoses: NandaDiagnosis[],
  patient: PatientInfo,
): Promise<string> {
  const { text } = await postJson("/api/evolution", { rawText, diagnoses, patient });
  return text ?? "";
}

/**
 * Envía un mensaje del Asistente IA a `/api/chat`. Pasar el `previousInteractionId`
 * de la respuesta anterior continúa la misma conversación (multi-turno stateful
 * del lado de Gemini); omitirlo arranca una conversación nueva.
 */
export async function sendChatMessage(
  message: string,
  previousInteractionId: string | null,
): Promise<{ text: string; interactionId: string }> {
  const { text, interactionId } = await postJson("/api/chat", {
    message,
    previousInteractionId: previousInteractionId ?? undefined,
  });
  return { text: text || "No se obtuvo respuesta.", interactionId: interactionId ?? "" };
}
