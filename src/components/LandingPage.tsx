import { useState } from "react";

import { Logo } from "./Logo";
import { SessionCreated } from "./SessionCreated";
import { SessionJoin } from "./SessionJoin";
import { createSession, joinSession, type Session } from "@/services/api";

type Props = {
  onOpenSession: (session: Session) => void;
};

export function LandingPage({ onOpenSession }: Props) {
  const [code, setCode] = useState("");
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<Session | null>(null);

  async function handleCreate() {
    setError(null);
    setCreating(true);
    try {
      setCreated(await createSession());
    } catch {
      setError("Couldn't reach the server. Try again in a moment.");
    } finally {
      setCreating(false);
    }
  }

  async function handleJoin() {
    setError(null);
    if (!code.trim()) {
      setError("Enter a session code to join.");
      return;
    }
    setJoining(true);
    try {
      onOpenSession(await joinSession(code));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't join that session.");
    } finally {
      setJoining(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 py-14">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <Logo size="lg" />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Write together. In real time.
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A shared code editor for two or more people. No accounts, no setup — just a session
            code.
          </p>
        </div>

        <div className="mt-9">
          {created ? (
            <SessionCreated
              session={created}
              onEnter={() => onOpenSession(created)}
              onBack={() => setCreated(null)}
            />
          ) : (
            <SessionJoin
              code={code}
              onCodeChange={setCode}
              onCreate={handleCreate}
              onJoin={handleJoin}
              creating={creating}
              joining={joining}
              error={error}
            />
          )}
        </div>

        <p className="mt-8 text-center font-mono text-[11px] text-muted-foreground">
          One shared document per session · Anonymous by design
        </p>
      </div>
    </main>
  );
}
