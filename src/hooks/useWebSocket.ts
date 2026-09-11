import { useEffect, useRef, useState } from "react";

import { type Collaborator, MOCK_COLLABORATORS } from "@/lib/mock-data";

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

type Options = {
  sessionCode: string;
  onDocument?: (content: string) => void;
};

export function useWebSocket({ sessionCode, onDocument }: Options) {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");

  const [collaborators] = useState<Collaborator[]>(MOCK_COLLABORATORS);

  const socketRef = useRef<WebSocket | null>(null);

  // Keeps the latest onDocument callback without
  // recreating the WebSocket connection.
  const onDocumentRef = useRef(onDocument);

  useEffect(() => {
    onDocumentRef.current = onDocument;
  }, [onDocument]);

  useEffect(() => {
    if (!sessionCode) {
      return;
    }

    //Added Status Connecting
    setStatus("connecting");

    //

    const socket = new WebSocket(`wss://syncscript.duckdns.org/ws?sessionCode=${sessionCode}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("[syncscript] WebSocket connected");
      setStatus("connected");
    };

    socket.onmessage = (event) => {
      console.log("[syncscript] received:", event.data);

      onDocumentRef.current?.(event.data);
    };

    socket.onerror = (error) => {
      console.error("[syncscript] WebSocket error:", error);
      setStatus("error");
    };

    socket.onclose = () => {
      console.log("[syncscript] WebSocket disconnected");
      setStatus("disconnected");
    };

    //"Closing Socket when sessionCode changes or component unmounts"
    return () => {
      socket.close();

      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, [sessionCode]);

  function sendDocument(content: string) {
    const socket = socketRef.current;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.warn("[syncscript] WebSocket is not connected");
      return;
    }

    socket.send(
      JSON.stringify({
        content,
      }),
    );
  }

  return {
    status,
    collaborators,
    sendDocument,
  };
}
