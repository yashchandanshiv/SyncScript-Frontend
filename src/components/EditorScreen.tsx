import { useState } from "react";

import { CodeEditor } from "./CodeEditor";
import type { CursorInfo } from "./CodeEditorClient";
import { Header } from "./Header";
import { StatusBar } from "./StatusBar";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { Session } from "@/services/api";

type Props = {
  session: Session;
  onLeave: () => void;
};

export function EditorScreen({ session, onLeave }: Props) {
  const [content, setContent] = useState(session.content);
  const [cursor, setCursor] = useState<CursorInfo>({ line: 1, column: 1, selection: 0 });

  // Only update when it actually changed, so the editor doesn't re-render in a loop.
  function handleCursorChange(next: CursorInfo) {
    setCursor((prev) =>
      prev.line === next.line && prev.column === next.column && prev.selection === next.selection
        ? prev
        : next,
    );
  }


  // Backend integration point: this hook will own the real socket connection.
  const { status, collaborators } = useWebSocket({
    sessionCode: session.sessionCode,
    onDocument: setContent,
  });

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header
        sessionCode={session.sessionCode}
        status={status}
        collaborators={collaborators}
        onLeave={onLeave}
      />

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <CodeEditor value={content} onChange={setContent} onCursorChange={handleCursorChange} />
        {content.length === 0 && (
          <p className="pointer-events-none absolute left-16 top-3 font-mono text-sm text-muted-foreground">
            Empty document — start typing to begin.
          </p>
        )}
      </div>

      <StatusBar
        status={status}
        cursor={cursor}
        characters={content.length}
        lines={content.split("\n").length}
      />
    </div>
  );
}
