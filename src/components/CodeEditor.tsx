import { Suspense, lazy, useEffect, useState } from "react";

import type { CursorInfo } from "./CodeEditorClient";

// CodeMirror is browser-only: load it after hydration.
const CodeEditorClient = lazy(() => import("./CodeEditorClient"));

type Props = {
  value: string;
  onChange: (value: string) => void;
  onCursorChange: (info: CursorInfo) => void;
};

function EditorFallback({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-surface text-sm text-muted-foreground">
      {message}
    </div>
  );
}

export function CodeEditor(props: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <EditorFallback message="Loading editor…" />;

  return (
    <Suspense fallback={<EditorFallback message="Loading editor…" />}>
      <CodeEditorClient {...props} />
    </Suspense>
  );
}
