import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror, { EditorView, type ViewUpdate } from "@uiw/react-codemirror";

export type CursorInfo = { line: number; column: number; selection: number };

type Props = {
  value: string;
  onChange: (value: string) => void;
  onCursorChange: (info: CursorInfo) => void;
};

export default function CodeEditorClient({ value, onChange, onCursorChange }: Props) {
  function handleUpdate(update: ViewUpdate) {
    const state = update.state;
    const range = state.selection.main;
    const line = state.doc.lineAt(range.head);
    onCursorChange({
      line: line.number,
      column: range.head - line.from + 1,
      selection: Math.abs(range.to - range.from),
    });
  }

  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={oneDark}
      extensions={[java(), EditorView.lineWrapping]}
      onChange={onChange}
      onUpdate={handleUpdate}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        autocompletion: false,
        bracketMatching: true,
        closeBrackets: true,
      }}
      style={{ height: "100%" }}
    />
  );
}
