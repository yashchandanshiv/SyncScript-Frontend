import type { Collaborator } from "@/lib/mock-data";

const DOT: Record<Collaborator["color"], string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
};

export function CollaboratorIndicator({ collaborators }: { collaborators: Collaborator[] }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5">
      <div className="flex -space-x-1.5">
        {collaborators.map((c) => (
          <span
            key={c.id}
            title={c.label}
            className={`h-2.5 w-2.5 rounded-full ring-2 ring-surface ${DOT[c.color]}`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {collaborators.length} collaborator{collaborators.length === 1 ? "" : "s"}
      </span>
    </div>
  );
}
