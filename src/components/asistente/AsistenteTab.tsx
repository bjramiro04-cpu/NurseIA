"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/hooks/useChatStore";
import WelcomeMessage from "./WelcomeMessage";
import ChatMessageBubble from "./ChatMessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

export default function AsistenteTab() {
  const messages = useChatStore((s) => s.messages);
  const sending = useChatStore((s) => s.sending);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
        <WelcomeMessage />
        {messages.map((m) => (
          <ChatMessageBubble key={m.id} message={m} />
        ))}
        {sending && <TypingIndicator />}
      </div>
      <ChatInput />
    </div>
  );
}
