import { NextResponse } from "next/server";
import { sendChatMessageServer } from "@/services/geminiServer";

interface ChatRequestBody {
  message?: string;
  previousInteractionId?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequestBody;
  const { message, previousInteractionId } = body;

  if (!message) {
    return NextResponse.json({ error: "Falta message." }, { status: 400 });
  }

  try {
    const { text, interactionId } = await sendChatMessageServer(message, previousInteractionId);
    return NextResponse.json({ text, interactionId });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Error consultando al asistente.";
    return NextResponse.json({ error: errorMessage }, { status: 502 });
  }
}
