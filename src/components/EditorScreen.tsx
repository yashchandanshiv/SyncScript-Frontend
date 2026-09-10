import { useEffect, useRef, useState } from "react";

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

  const [cursor, setCursor] = useState<CursorInfo>({
    line: 1,
    column: 1,
    selection: 0,
  });

  // Used to identify changes that came from the server.
  const receivingDocument = useRef(false);

  // Used for debouncing outgoing document updates.
  const sendTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { status, collaborators, sendDocument } = useWebSocket({
    sessionCode: session.sessionCode,

    onDocument: (nextContent) => {
      receivingDocument.current = true;
      setContent(nextContent);
    },
  });

  function handleCursorChange(next: CursorInfo) {
    setCursor((prev) =>
      prev.line === next.line && prev.column === next.column && prev.selection === next.selection
        ? prev
        : next,
    );
  }

  function handleContentChange(nextContent: string) {
    // This change came from the server.
    // Do not send it back.
    if (receivingDocument.current) {
      receivingDocument.current = false;
      setContent(nextContent);
      return;
    }

    // This is a local edit.
    setContent(nextContent);

    // Cancel the previous pending send.
    if (sendTimer.current) {
      clearTimeout(sendTimer.current);
    }

    // Wait until the user stops typing briefly.
    sendTimer.current = setTimeout(() => {
      sendDocument(nextContent);
    }, 250);
  }

  // Clean up the debounce timer when leaving the editor.
  useEffect(() => {
    return () => {
      if (sendTimer.current) {
        clearTimeout(sendTimer.current);
      }
    };
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header
        sessionCode={session.sessionCode}
        status={status}
        collaborators={collaborators}
        onLeave={onLeave}
      />

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <CodeEditor
          value={content}
          onChange={handleContentChange}
          onCursorChange={handleCursorChange}
        />

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
