"use client";

import { Fragment } from "react";
import clsx from "clsx";
import type { ChatUiMessage } from "@/hooks/useChatStore";
import { AiAvatarIcon, UserAvatarIcon } from "@/components/icons/Icons";

function renderInline(line: string) {
  return line
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}

function renderContent(text: string) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {renderInline(line)}
    </Fragment>
  ));
}

export default function ChatMessageBubble({ message }: { message: ChatUiMessage }) {
  const isAi = message.role === "assistant";

  return (
    <div className={clsx("flex animate-fade-in items-start gap-3", !isAi && "flex-row-reverse")}>
      <div
        className={clsx(
          "mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
          isAi ? "bg-violet-100 dark:bg-violet-900/40" : "bg-slate-200 dark:bg-slate-700",
        )}
      >
        {isAi ? (
          <AiAvatarIcon className="h-4 w-4 text-violet-600" />
        ) : (
          <UserAvatarIcon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        )}
      </div>
      <div
        className={clsx(
          "max-w-lg rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isAi
            ? clsx("bubble-ai", message.error && "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/20")
            : "bubble-user",
        )}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}
