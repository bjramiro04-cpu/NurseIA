import { NextResponse } from "next/server";
import type { PatientInfo } from "@/types/analysis";
import { analyzeClinicalTextServer } from "@/services/geminiServer";

interface AnalyzeRequestBody {
  rawText?: string;
  patient?: PatientInfo;
}

export async function POST(request: Request) {
  const body = (await request.json()) as AnalyzeRequestBody;
  const { rawText, patient } = body;

  if (!rawText) {
    return NextResponse.json({ error: "Falta rawText." }, { status: 400 });
  }

  try {
    const { diagnoses, evolutionText } = await analyzeClinicalTextServer(
      rawText,
      patient ?? { nombre: "", edad: "", cama: "" },
    );
    return NextResponse.json({ diagnoses, evolutionText });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error analizando el texto clínico.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
