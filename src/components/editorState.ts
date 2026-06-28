import type { ElementDef } from "./elementDef";

export interface EditorState {
    selectedId: string | null;
    elements: Record<string, ElementDef>;
};

export interface DragState {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    element: HTMLElement;
    parent: HTMLElement;
};

export const initialState: EditorState = {
    selectedId: null,
    elements: {}
}