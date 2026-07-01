import type { ElementDef } from "./elementDef";

export interface EditorState {
    selectedId: string | null;
    elements: Record<string, ElementDef>;

    tree: TreeContext;
};

export interface TreeContext {
    rootIds: string[];
    parent: Record<string, string | null>;
    children: Record<string, string[]>;
}

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
    elements: {},
    tree: {
        rootIds: [],
        parent: {},
        children: {}
    }
}