import type { ConnectionStatus as Status } from "@/hooks/useWebSocket";

const MAP: Record<Status, { label: string; dot: string; text: string }> = {
  connecting: { label: "Connecting", dot: "bg-warning", text: "text-warning" },
  connected: { label: "Connected", dot: "bg-success", text: "text-success" },
  disconnected: { label: "Disconnected", dot: "bg-destructive", text: "text-destructive" },
  error: { label: "Server unavailable", dot: "bg-destructive", text: "text-destructive" },
};

export function ConnectionStatus({ status, subtle }: { status: Status; subtle?: boolean }) {
  const s = MAP[status];
  return (
    <span className={`flex items-center gap-1.5 text-xs ${subtle ? "text-muted-foreground" : s.text}`}>
      <span
        className={`h-2 w-2 rounded-full ${s.dot} ${status === "connecting" ? "animate-pulse" : ""}`}
      />
      {s.label}
    </span>
  );
}
