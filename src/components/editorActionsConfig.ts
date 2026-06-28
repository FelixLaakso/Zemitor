import type { EditorAction } from "./editorAction";
import type { ElementDef } from "./elementDef";

export type Action =
    | { type: EditorAction.Select; id: string }
    | { type: EditorAction.SetWidth; width: string; }
    | { type: EditorAction.SetHeight; height: string; }
    | { type: EditorAction.MoveElement; x: number; y: number }
    | { type: EditorAction.AddElement; };