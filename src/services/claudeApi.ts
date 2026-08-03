import type { ChatMessage } from "@/types/chat";
import type { NandaDiagnosis } from "@/types/nanda";
import type { PatientInfo } from "@/types/analysis";

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-6";

interface AnthropicContentBlock {
  text?: string;
}
interface AnthropicResponse {
  content?: AnthropicContentBlock[];
  error?: { message?: string };
}

async function callClaude(
  system: string,
  messages: ChatMessage[],
  maxTokens: number,
): Promise<string> {
  const response = await fetch(ANTHROPIC_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages }),
  });

  const data = (await response.json()) as AnthropicResponse;
  if (!response.ok) throw new Error(data.error?.message ?? "Error de la API de Claude");

  return data.content?.map((block) => block.text ?? "").join("") ?? "";
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
export async function generateEvolution(
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

  return callClaude(EVOLUTION_SYSTEM_PROMPT, [{ role: "user", content: userPrompt }], 1200);
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

/** Envía el historial completo del chat del Asistente IA y devuelve la respuesta. */
export async function sendChatMessage(history: ChatMessage[]): Promise<string> {
  const reply = await callClaude(ASSISTANT_SYSTEM_PROMPT, history, 1000);
  return reply || "No se obtuvo respuesta.";
}
