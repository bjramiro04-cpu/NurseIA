import { AiAvatarIcon } from "@/components/icons/Icons";

export default function TypingIndicator() {
  return (
    <div className="flex animate-fade-in items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40">
        <AiAvatarIcon className="h-4 w-4 text-violet-600" />
      </div>
      <div className="bubble-ai flex items-center gap-1.5 rounded-2xl px-4 py-3">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
