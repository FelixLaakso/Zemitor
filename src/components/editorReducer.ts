import { EditorAction } from "./editorAction";
import type { Action } from "./editorActionsConfig";
import type { EditorState } from "./editorState";
import type { ElementDef } from "./elementDef";

export function editorReducer(
    state: EditorState,
    action: Action
): EditorState {
    switch (action.type) {
        case EditorAction.AddElement:
            const newElement: ElementDef = {
                id: `element-${Date.now()}`,
                x: 0,
                y: 0,
                position: "absolute",
                display: "block",
                width: 100,
                height: 100,
                widthUnit: "px",
                heightUnit: "px",
                style: {
                    backgroundColor: "red"
                },
                children: []
            };

            const newState = {
                ...state,
                elements: {
                    ...state.elements,
                    [newElement.id]: newElement,
                },
            };

            return newState;

        case EditorAction.SetWidth:
            if (!state.selectedId) throw new Error();

            return {
                ...state,
                elements: {
                    ...state.elements,
                    [state.selectedId]: {
                        ...state.elements[state.selectedId],
                        width: action.width,
                    }
                }
            };

        case EditorAction.SetHeight:
            if (!state.selectedId) throw new Error();

            return {
                ...state,
                elements: {
                    ...state.elements,
                    [state.selectedId]: {
                        ...state.elements[state.selectedId],
                        height: action.height,
                    }
                }
            };

        case EditorAction.MoveElement:
            if (!state.selectedId) throw new Error();

            return {
                ...state,
                elements: {
                    ...state.elements,
                    [state.selectedId]: {
                        ...state.elements[state.selectedId],
                        style: {
                            ...state.elements[state.selectedId]?.style,
                            left: action.x + "px",
                            top: action.y + "px"
                        }
                    }
                }
            };

        case EditorAction.Select:
            return {
                ...state,
                selectedId: action.id
            };

        case EditorAction.SetWidthUnit:
            if (!state.selectedId) throw new Error();

            return {
                ...state,
                elements: {
                    ...state.elements,
                    [state.selectedId]: {
                        ...state.elements[state.selectedId],
                        widthUnit: action.unit
                    }
                }
            };

        case EditorAction.SetHeightUnit:
            if (!state.selectedId) throw new Error();
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [state.selectedId]: {
                        ...state.elements[state.selectedId],
                        heightUnit: action.unit
                    }
                }
            };

        default:
            return state;
    }
}