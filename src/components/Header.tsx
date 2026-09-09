import { LogOut } from "lucide-react";

import { CollaboratorIndicator } from "./CollaboratorIndicator";
import { ConnectionStatus } from "./ConnectionStatus";
import { CopyButton } from "./CopyButton";
import { Logo } from "./Logo";
import type { ConnectionStatus as Status } from "@/hooks/useWebSocket";
import type { Collaborator } from "@/lib/mock-data";

type Props = {
  sessionCode: string;
  status: Status;
  collaborators: Collaborator[];
  onLeave: () => void;
};

export function Header({ sessionCode, status, collaborators, onLeave }: Props) {
  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-border bg-surface px-4 py-2.5">
      <Logo />

      <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5">
        <span className="text-xs text-muted-foreground">Session</span>
        <span className="font-mono text-sm tracking-widest">{sessionCode}</span>
      </div>
      <CopyButton value={sessionCode} label="Copy" />

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden sm:block">
          <ConnectionStatus status={status} />
        </span>
        <CollaboratorIndicator collaborators={collaborators} />
        <button
          type="button"
          onClick={onLeave}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-destructive/60 hover:text-destructive"
        >
          <LogOut className="h-3.5 w-3.5" />
          Leave
        </button>
      </div>
    </header>
  );
}
