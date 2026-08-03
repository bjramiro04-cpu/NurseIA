import { NextResponse } from "next/server";
import type { NandaDiagnosis } from "@/types/nanda";
import type { PatientInfo } from "@/types/analysis";
import { generateEvolutionServer } from "@/services/geminiServer";

interface EvolutionRequestBody {
  rawText?: string;
  diagnoses?: NandaDiagnosis[];
  patient?: PatientInfo;
}

export async function POST(request: Request) {
  const body = (await request.json()) as EvolutionRequestBody;
  const { rawText, diagnoses, patient } = body;

  if (!rawText || !diagnoses?.length) {
    return NextResponse.json({ error: "Faltan rawText o diagnoses." }, { status: 400 });
  }

  try {
    const text = await generateEvolutionServer(rawText, diagnoses, patient ?? { nombre: "", edad: "", cama: "" });
    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error generando la evolución.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
