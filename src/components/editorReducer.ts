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
                style: {
                    width: "100px",
                    height: "100px",
                    backgroundColor: "red",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
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
                        style: {
                            ...state.elements[state.selectedId].style,
                            width: action.width
                        }
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
                        style: {
                            ...state.elements[state.selectedId].style,
                            height: action.height
                        }
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
                            ...state.elements[state.selectedId].style,
                            left: action.x,
                            top: action.y
                        }
                    }
                }
            };

        case EditorAction.Select:
            return {
                ...state,
                selectedId: action.id
            };

        default:
            return state;
    }
}