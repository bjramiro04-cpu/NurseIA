import { NextResponse } from "next/server";
import type { ChatMessage } from "@/types/chat";
import { sendChatMessageServer } from "@/services/anthropicServer";

interface ChatRequestBody {
  history?: ChatMessage[];
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequestBody;
  const { history } = body;

  if (!history?.length) {
    return NextResponse.json({ error: "Falta history." }, { status: 400 });
  }

  try {
    const text = await sendChatMessageServer(history);
    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error consultando al asistente.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
