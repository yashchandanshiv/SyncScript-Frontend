import { useEffect, useState } from "react";

import { type Collaborator, MOCK_COLLABORATORS } from "@/lib/mock-data";

/**
 * WebSocket integration point.
 *
 * Real endpoint (NOT connected yet):
 *   ws://localhost:8080/ws?sessionCode={sessionCode}
 *
 * Outgoing operations the backend understands:
 *   { type: "insert", position: number, text: string }
 *   { type: "append", text: string }
 *   { type: "delete", position: number, length: number }
 *
 * Incoming: the server broadcasts the full document as plain text.
 *
 * For now this hook only drives UI state (status + collaborators). Replace the
 * body with a real `new WebSocket(...)` and call `onDocument` with each
 * broadcast payload — no component changes required.
 */

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

export type EditorOperation =
  | { type: "insert"; position: number; text: string }
  | { type: "append"; text: string }
  | { type: "delete"; position: number; length: number };

type Options = {
  sessionCode: string;
  /** Called with the full document text broadcast by the server. */
  onDocument?: (content: string) => void;
};

export function useWebSocket({ sessionCode }: Options) {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [collaborators, setCollaborators] = useState<Collaborator[]>(MOCK_COLLABORATORS);

  useEffect(() => {
    if (!sessionCode) return;
    setStatus("connecting");
    setCollaborators(MOCK_COLLABORATORS);

    // TODO: const socket = new WebSocket(`ws://localhost:8080/ws?sessionCode=${sessionCode}`);
    const timer = setTimeout(() => setStatus("connected"), 900);
    return () => clearTimeout(timer);
  }, [sessionCode]);

  /** TODO: socket.send(JSON.stringify(operation)) */
  function sendOperation(operation: EditorOperation) {
    if (import.meta.env.DEV) {
      console.debug("[syncscript] queued operation", operation);
    }
  }

  return { status, collaborators, sendOperation, setStatus };
}
