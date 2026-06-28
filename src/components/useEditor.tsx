import { useReducer, useRef } from "react";
import { editorReducer } from "./editorReducer";
import { initialState, type DragState } from "./editorState";
import { EditorAction } from "./editorAction";
import { ElementRenderer } from "./elementRenderer";

export function useEditor() {
    const [state, dispatch] = useReducer(
        editorReducer,
        initialState
    );

    const dragState = useRef<DragState | null>(null);

    const addElement = () => {
        dispatch({
            type: EditorAction.AddElement
        });
    };

    const setWidth = (width: string) => {
        dispatch({
            type: EditorAction.SetWidth,
            width: width
        });
    };

    const setHeight = (height: string) => {
        dispatch({
            type: EditorAction.SetHeight,
            height: height
        });
    };

    const dragStart = (e: React.PointerEvent<HTMLElement>) => {
        if (!(e.target instanceof HTMLElement)) return;

        const currentElement = document.getElementById(e.target.id);
        if (!currentElement) return;

        dispatch({
            type: EditorAction.Select,
            id: currentElement.id
        });

        const itemRect = currentElement.getBoundingClientRect();

        dragState.current = {
            offsetX: e.clientX - itemRect.left,
            offsetY: e.clientY - itemRect.top,
            x: itemRect.left,
            y: itemRect.top,
            element: currentElement,
            parent: document.getElementById("zemitor-preview")!
        }

        e.target.setPointerCapture(e.pointerId);
    }

    const dragMove = (e: React.PointerEvent<HTMLElement>) => {
        if (!dragState.current) return;

        const parentRect = dragState.current.parent.getBoundingClientRect();

        dragState.current.x =
            e.clientX -
            parentRect.left -
            dragState.current.offsetX;

        dragState.current.y =
            e.clientY -
            parentRect.top -
            dragState.current.offsetY;

        dragState.current.element.style.left = `${dragState.current.x}px`;
        dragState.current.element.style.top = `${dragState.current.y}px`;
    }

    const dragEnd = (e: React.PointerEvent<HTMLElement>) => {
        if (!dragState.current) return;

        dispatch({
            type: EditorAction.MoveElement,
            x: dragState.current.x,
            y: dragState.current.y
        });

        dragState.current = null;
    }

    const preview = () => {
        return (
            <div id="zemitor-preview"
                onPointerDown={dragStart}
                onPointerMove={dragMove}
                onPointerUp={dragEnd}
                onClick={handleClick}
                style={{ cursor: dragState.current ? "grabbing" : "grab" }}>
                {
                    Object.entries(state.elements).map(([id, element]) => (
                        <ElementRenderer key={id} element={element} />
                    ))
                }
            </div>
        )

    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof HTMLElement) {
            if (e.target === e.currentTarget) return;
            dispatch({
                type: EditorAction.Select,
                id: e.target.id
            });
        }
    };

    return {
        state,
        dispatch,

        dragStart,
        dragMove,
        dragEnd,
        addElement,
        setWidth,
        setHeight,
        preview
    };
}