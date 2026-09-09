import { ArrowRight } from "lucide-react";

import { CopyButton } from "./CopyButton";
import type { Session } from "@/services/api";

type Props = {
  session: Session;
  onEnter: () => void;
  onBack: () => void;
};

export function SessionCreated({ session, onEnter, onBack }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <p className="text-sm text-muted-foreground">Session created</p>

      <div className="mt-4 flex flex-col items-center gap-4 rounded-lg border border-border bg-surface px-4 py-6">
        <span className="font-mono text-4xl tracking-[0.35em] text-primary sm:text-5xl">
          {session.sessionCode}
        </span>
        <CopyButton value={session.sessionCode} label="Copy code" />
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Share this code with someone to collaborate.
      </p>

      <button
        type="button"
        onClick={onEnter}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Enter Editor
        <ArrowRight className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        Back
      </button>
    </div>
  );
}
