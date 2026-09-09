import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { EditorScreen } from "@/components/EditorScreen";
import { LandingPage } from "@/components/LandingPage";
import type { Session } from "@/services/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SyncScript — Real-time collaborative code editor" },
      {
        name: "description",
        content:
          "Write together in real time. Share a session code and edit one shared document with your collaborators — no accounts required.",
      },
      { property: "og:title", content: "SyncScript — Write together. In real time." },
      {
        property: "og:description",
        content:
          "A minimal collaborative code editor. Create a session, share the code, and edit together instantly.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [session, setSession] = useState<Session | null>(null);

  if (session) {
    return <EditorScreen session={session} onLeave={() => setSession(null)} />;
  }

  return <LandingPage onOpenSession={setSession} />;
}
