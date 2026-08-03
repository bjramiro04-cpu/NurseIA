import "server-only";
import { GoogleGenAI, ThinkingLevel, Type, type Schema } from "@google/genai";
import type { ChatMessage } from "@/types/chat";
import type { PatientInfo, AiNandaDiagnosis } from "@/types/analysis";

const MODEL = "gemini-3.5-flash-lite";

// Fuentes del catálogo NANDA-I 2024-2026 que la IA consulta en vivo (herramienta
// url_context) en vez de matchear contra un catálogo local — así los códigos y
// dominios que devuelve están anclados a la fuente real, no a la memoria del modelo.
const NANDA_SOURCES = ["https://guiananda.com/", "https://diagnosticosnanda.com/"];

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

function buildPatientReference({ nombre, edad, cama }: PatientInfo): string {
  if (nombre) {
    return `${nombre}${edad ? `, ${edad} años` : ""}${cama ? ` (Cama ${cama})` : ""}`;
  }
  if (edad) {
    return `Paciente de ${edad} años${cama ? ` (Cama ${cama})` : ""}`;
  }
  return "el/la paciente";
}

const ANALYSIS_SYSTEM_PROMPT = `Sos nurseIA, asistente clínico especializado en enfermería argentina.

PASO 1 — IDENTIFICAR DIAGNÓSTICOS NANDA REALES:
Antes de responder, consultá con la herramienta url_context estas fuentes del catálogo NANDA-I 2024-2026:
${NANDA_SOURCES.join("\n")}

Identificá hasta 3 diagnósticos NANDA reales (código oficial EXACTO de esas fuentes, nunca inventado) que apliquen a la descripción del enfermero, priorizados por riesgo vital. Para cada uno indicá también un matchPercent (0-100) que refleje qué tan bien encaja ese diagnóstico con el texto ingresado.

PASO 2 — REDACTAR LA EVOLUCIÓN (campo evolutionText):
Con esos mismos diagnósticos, redactá una evolución en formato PAC (Proceso de Atención de Cuidados).

REGLAS ABSOLUTAS PARA evolutionText:
1. Usá ÚNICAMENTE los datos que aparecen en la descripción del enfermero. NUNCA inventes síntomas, causas, antecedentes ni contextos que no estén escritos.
2. El R/C (relación causal) debe basarse SOLO en lo que se menciona. Si no hay causa clara, escribí "r/c causa en estudio" o usá la causa más obvia del texto.
3. Usá el nombre real del paciente si se proporcionó. Nunca uses "el paciente" como pronombre — usá el nombre o "el/la paciente".
4. Lenguaje mixto profesional: "El paciente refiere..." / "La paciente refiere..." para lo subjetivo. "Se constata...", "Se administra...", "Se monitoriza...", "Se posiciona..." para las intervenciones del enfermero.
5. Formato EXACTO — 5 secciones en este orden, cada una en su propia línea, sin markdown (nunca asteriscos ni #):

VALORACIÓN: [descripción clínica usando los datos reales del texto]
DIAGNÓSTICO ENFERMERO: [Nombre diagnóstico] (NANDA XXXXX) r/c [causa real del texto] m/p [manifestaciones reales del texto]
PLANIFICACIÓN (NOC): [objetivo medible y realista para este turno, usando los datos reales]
INTERVENCIÓN (NIC): [acciones concretas de enfermería, en primera persona del plural "Se..."]
EVALUACIÓN: [cómo y cuándo se evaluará la respuesta al tratamiento]

6. Si hay más de un diagnóstico, escribí una sección PAC completa por diagnóstico, separadas ÚNICAMENTE por una línea que contenga exactamente: ---
   No pongas "---" entre las 5 secciones de UN MISMO diagnóstico — esa línea va solo entre diagnósticos distintos.
7. Cada sección: 2-3 oraciones. Conciso y clínico.

PASO 3 — SALIDA:
Devolvé ÚNICAMENTE el JSON pedido por el schema de respuesta, sin texto adicional, sin markdown ni backticks.`;

const ANALYSIS_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    diagnoses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          diagnostico: { type: Type.STRING },
          codigo: { type: Type.STRING },
          dominio: { type: Type.STRING },
          prioridad: { type: Type.STRING, format: "enum", enum: ["Alta", "Media", "Baja"] },
          abcde: {
            type: Type.STRING,
            format: "enum",
            enum: ["A-B", "B-C", "C", "C-D", "C-E", "C-D-E", "D", "D-E", "E"],
          },
          rc: { type: Type.STRING },
          mp: { type: Type.STRING },
          matchPercent: { type: Type.INTEGER },
        },
        required: ["diagnostico", "codigo", "dominio", "prioridad", "abcde", "rc", "mp", "matchPercent"],
      },
    },
    evolutionText: { type: Type.STRING },
  },
  required: ["diagnoses", "evolutionText"],
};

/**
 * Identifica diagnósticos NANDA reales (consultando el catálogo NANDA-I vía
 * url_context, no un mock local) y redacta la evolución PAC en una sola
 * llamada a la IA.
 */
export async function analyzeClinicalTextServer(
  rawText: string,
  patient: PatientInfo,
): Promise<{ diagnoses: AiNandaDiagnosis[]; evolutionText: string }> {
  const userPrompt = `DESCRIPCIÓN DEL ENFERMERO:
"${rawText}"

REFERENCIA DEL PACIENTE: ${buildPatientReference(patient)}`;

  const response = await getClient().models.generateContent({
    model: MODEL,
    contents: userPrompt,
    config: {
      systemInstruction: ANALYSIS_SYSTEM_PROMPT,
      tools: [{ urlContext: {} }],
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
      maxOutputTokens: 4000,
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
    },
  });

  if (!response.text) {
    throw new Error("La IA no devolvió ninguna respuesta.");
  }

  let parsed: { diagnoses?: AiNandaDiagnosis[]; evolutionText?: string };
  try {
    parsed = JSON.parse(response.text);
  } catch {
    throw new Error("La IA devolvió una respuesta con formato inválido.");
  }

  if (!Array.isArray(parsed.diagnoses) || !parsed.evolutionText) {
    throw new Error("La IA devolvió una respuesta incompleta.");
  }

  return { diagnoses: parsed.diagnoses, evolutionText: parsed.evolutionText };
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
export async function sendChatMessageServer(history: ChatMessage[]): Promise<string> {
  const contents = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await getClient().models.generateContent({
    model: MODEL,
    contents,
    config: {
      systemInstruction: ASSISTANT_SYSTEM_PROMPT,
      maxOutputTokens: 2000,
      thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
    },
  });

  return response.text || "No se obtuvo respuesta.";
}
