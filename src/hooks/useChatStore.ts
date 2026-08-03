import { create } from "zustand";
import { nanoid } from "nanoid";
import type { ChatMessage } from "@/types/chat";
import { sendChatMessage } from "@/services/aiApi";

export interface ChatUiMessage extends ChatMessage {
  id: string;
  error?: boolean;
}

interface ChatState {
  messages: ChatUiMessage[];
  sending: boolean;
  lastInteractionId: string | null;
  send: (text: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  sending: false,
  lastInteractionId: null,

  send: async (text) => {
    const userMessage: ChatUiMessage = { id: nanoid(8), role: "user", content: text };
    set((state) => ({ messages: [...state.messages, userMessage], sending: true }));

    try {
      const { text: reply, interactionId } = await sendChatMessage(text, get().lastInteractionId);
      set((state) => ({
        messages: [...state.messages, { id: nanoid(8), role: "assistant", content: reply }],
        sending: false,
        lastInteractionId: interactionId || state.lastInteractionId,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: nanoid(8),
            role: "assistant",
            content: `Error de conexión: ${message}. Verificá tu conexión a internet e intentá de nuevo.`,
            error: true,
          },
        ],
        sending: false,
      }));
    }
  },
}));
