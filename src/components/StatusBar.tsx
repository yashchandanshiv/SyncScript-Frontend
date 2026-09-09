import { ConnectionStatus } from "./ConnectionStatus";
import type { ConnectionStatus as Status } from "@/hooks/useWebSocket";
import type { CursorInfo } from "./CodeEditorClient";

type Props = {
  status: Status;
  cursor: CursorInfo;
  characters: number;
  lines: number;
};

export function StatusBar({ status, cursor, characters, lines }: Props) {
  return (
    <footer className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border bg-surface px-4 py-2 font-mono text-xs text-muted-foreground">
      <ConnectionStatus status={status} />
      <span>
        Ln {cursor.line}, Col {cursor.column}
      </span>
      {cursor.selection > 0 && <span>{cursor.selection} selected</span>}
      <span className="ml-auto">{lines} lines</span>
      <span>{characters} chars</span>
    </footer>
  );
}
