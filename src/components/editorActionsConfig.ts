import type { EditorAction } from "./editorAction";

export type Action =
    | { type: EditorAction.Select; id: string }
    | { type: EditorAction.SetWidth; width: number; }
    | { type: EditorAction.SetHeight; height: number; }
    | { type: EditorAction.SetWidthUnit; unit: string }
    | { type: EditorAction.SetHeightUnit; unit: string }
    | { type: EditorAction.MoveElement; x: number; y: number }
    | { type: EditorAction.AddElement; };