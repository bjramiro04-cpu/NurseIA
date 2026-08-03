import "server-only";
import { GoogleGenAI } from "@google/genai";
import type { NandaDiagnosis } from "@/types/nanda";
import type { PatientInfo } from "@/types/analysis";

const MODEL = "gemini-3.6-flash";

let client: GoogleGenAI | null = null;

/**
 * Único punto de contacto con la API de Gemini. Solo debe importarse desde
 * route handlers (`src/app/api/**\/route.ts`) — nunca desde un hook, componente
 * o cualquier archivo que pueda terminar en el bundle del cliente. El import
 * de "server-only" hace que el build falle si eso llegara a pasar.
 */
function getClient(): GoogleGenAI {
  if (client) return client;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta configurar GEMINI_API_KEY en el servidor (.env.local).");
  }

  client = new GoogleGenAI({ apiKey });
  return client;
}

interface CreateInteractionOptions {
  systemInstruction: string;
  input: string;
  maxOutputTokens: number;
  previousInteractionId?: string;
}

async function createInteraction({
  systemInstruction,
  input,
  maxOutputTokens,
  previousInteractionId,
}: CreateInteractionOptions): Promise<{ text: string; interactionId: string }> {
  const interaction = await getClient().interactions.create({
    model: MODEL,
    input,
    system_instruction: systemInstruction,
    previous_interaction_id: previousInteractionId,
    generation_config: { max_output_tokens: maxOutputTokens },
  });

  if (interaction.status !== "completed" || !interaction.output_text) {
    throw new Error(`La IA no completó la respuesta (status: ${interaction.status}).`);
  }

  return { text: interaction.output_text, interactionId: interaction.id };
}

const EVOLUTION_SYSTEM_PROMPT = `Sos nurseIA, asistente clínico especializado en enfermería argentina.
Redactás evoluciones de enfermería en formato PAC (Proceso de Atención de Cuidados).

REGLAS ABSOLUTAS:
1. Usá ÚNICAMENTE los datos que aparecen en la descripción del enfermero. NUNCA inventes síntomas, causas, antecedentes ni contextos que no estén escritos.
2. El R/C (relación causal) debe basarse SOLO en lo que se menciona. Si no hay causa clara, escribí "r/c causa en estudio" o usá la causa más obvia del texto.
3. Usá el nombre real del paciente si se proporcionó. Nunca uses "el paciente" como pronombre — usá el nombre o "el/la paciente".
4. Lenguaje mixto profesional: "El paciente refiere..." / "La paciente refiere..." para lo subjetivo. "Se constata...", "Se administra...", "Se monitoriza...", "Se posiciona..." para las intervenciones del enfermero.
5. Formato EXACTO — 5 secciones en este orden, cada una en su propia línea:

VALORACIÓN: [descripción clínica usando los datos reales del texto]
DIAGNÓSTICO ENFERMERO: [Nombre diagnóstico] (NANDA XXXXX) r/c [causa real del texto] m/p [manifestaciones reales del texto]
PLANIFICACIÓN (NOC): [objetivo medible y realista para este turno, usando los datos reales]
INTERVENCIÓN (NIC): [acciones concretas de enfermería, en primera persona del plural "Se..."]
EVALUACIÓN: [cómo y cuándo se evaluará la respuesta al tratamiento]

6. Si hay más de un diagnóstico, escribí una sección PAC completa por diagnóstico, separadas con esta línea exacta: ---
7. Máximo 3 diagnósticos. Priorizá los de mayor riesgo para la vida.
8. Nunca uses markdown (no asteriscos, no #). Solo texto plano con las etiquetas de sección.
9. Longitud: cada sección 2-3 oraciones. Conciso y clínico.`;

function buildPatientReference({ nombre, edad, cama }: PatientInfo): string {
  if (nombre) {
    return `${nombre}${edad ? `, ${edad} años` : ""}${cama ? ` (Cama ${cama})` : ""}`;
  }
  if (edad) {
    return `Paciente de ${edad} años${cama ? ` (Cama ${cama})` : ""}`;
  }
  return "el/la paciente";
}

/**
 * Genera la evolución PAC personalizada con IA a partir del texto del
 * enfermero y los diagnósticos NANDA detectados (máximo 3, más prioritarios).
 */
export async function generateEvolutionServer(
  rawText: string,
  diagnoses: NandaDiagnosis[],
  patient: PatientInfo,
): Promise<string> {
  const refPaciente = buildPatientReference(patient);

  const diagsList = diagnoses
    .slice(0, 3)
    .map(
      (d, i) =>
        `${i + 1}. ${d.diagnostico} (NANDA ${d.codigo})\n   Prioridad: ${d.prioridad} | ABCDE: ${d.abcde}\n   R/C sugerido: ${d.rc}\n   M/P sugerido: ${d.mp}`,
    )
    .join("\n");

  const userPrompt = `DESCRIPCIÓN DEL ENFERMERO:
"${rawText}"

REFERENCIA DEL PACIENTE: ${refPaciente}

DIAGNÓSTICOS NANDA DETECTADOS (usá solo los relevantes al texto):
${diagsList}

Generá la evolución PAC personalizada usando EXCLUSIVAMENTE los datos de la descripción del enfermero.`;

  const { text } = await createInteraction({
    systemInstruction: EVOLUTION_SYSTEM_PROMPT,
    input: userPrompt,
    maxOutputTokens: 1200,
  });
  return text;
}

const ASSISTANT_SYSTEM_PROMPT = `Sos nurseIA, un asistente clínico especializado en enfermería.
Respondés en español (o en inglés si el usuario escribe en inglés).

Podés ayudar con:
- Diagnósticos NANDA y su justificación (código, RC, MP)
- Intervenciones NIC relacionadas a cada diagnóstico
- Resultados NOC esperados
- Priorización ABCDE en situaciones de urgencia
- Redacción de evoluciones de enfermería estructuradas
- Protocolos y procedimientos clínicos habituales
- Farmacología básica: mecanismo de acción, dosis habituales, cuidados de administración
- Cálculo de goteo, dosis por peso y preparación de soluciones
- Interpretación básica de valores de laboratorio y signos vitales

Tus respuestas son claras, estructuradas y en lenguaje clínico apropiado para enfermeros universitarios.
Cuando sea relevante, organizá la respuesta con negritas para los títulos y viñetas para los puntos.

IMPORTANTE: Siempre recordá al final que tus respuestas son orientativas y no reemplazan el criterio clínico profesional ni el protocolo institucional.`;

/**
 * Envía un mensaje del Asistente IA. Si se pasa `previousInteractionId`,
 * Gemini continúa esa conversación (multi-turno stateful); si no, arranca
 * una nueva.
 */
export async function sendChatMessageServer(
  message: string,
  previousInteractionId?: string,
): Promise<{ text: string; interactionId: string }> {
  return createInteraction({
    systemInstruction: ASSISTANT_SYSTEM_PROMPT,
    input: message,
    maxOutputTokens: 1000,
    previousInteractionId,
  });
}
