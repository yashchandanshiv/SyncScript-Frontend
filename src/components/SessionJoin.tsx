import { Loader2, Plus } from "lucide-react";

type Props = {
  code: string;
  onCodeChange: (code: string) => void;
  onCreate: () => void;
  onJoin: () => void;
  creating: boolean;
  joining: boolean;
  error: string | null;
};

export function SessionJoin({
  code,
  onCodeChange,
  onCreate,
  onJoin,
  creating,
  joining,
  error,
}: Props) {
  const busy = creating || joining;

  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <button
        type="button"
        onClick={onCreate}
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        {creating ? "Creating session…" : "Create Session"}
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or join an existing one
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onJoin();
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={code}
          onChange={(e) => onCodeChange(e.target.value.toUpperCase().slice(0, 6))}
          placeholder="SESSION CODE"
          aria-label="Session code"
          maxLength={6}
          className="flex-1 rounded-lg border border-border bg-input px-3.5 py-2.5 font-mono text-sm tracking-[0.25em] text-foreground placeholder:tracking-normal placeholder:text-muted-foreground focus:border-ring focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent disabled:opacity-60"
        >
          {joining && <Loader2 className="h-4 w-4 animate-spin" />}
          {joining ? "Joining…" : "Join Session"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        Create a session and share the code with your collaborator.
      </p>
    </div>
  );
}
