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

    const setWidth = (width: number) => {
        dispatch({
            type: EditorAction.SetWidth,
            width: width
        });
    };

    const setWidthUnit = (unit: string) => {
        dispatch({
            type: EditorAction.SetWidthUnit,
            unit: unit
        });
    }

    const setHeight = (height: number) => {
        dispatch({
            type: EditorAction.SetHeight,
            height: height
        });
    };

    const setHeightUnit = (unit: string) => {
        dispatch({
            type: EditorAction.SetHeightUnit,
            unit: unit
        });
    }

    const dragStart = (e: React.PointerEvent<HTMLElement>) => {
        if (!(e.target instanceof HTMLElement)) return;

        if (e.target === e.currentTarget) return;

        const currentElement = e.target;
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
        if (!(e.target instanceof HTMLElement)) return;
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
        if (!(e.target instanceof HTMLElement)) return;
        if (!dragState.current) return;

        dispatch({
            type: EditorAction.MoveElement,
            x: dragState.current.x,
            y: dragState.current.y
        });

        dragState.current = null;
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target === e.currentTarget) return;
        dispatch({
            type: EditorAction.Select,
            id: e.target.id
        });
    }

    const elementRefs = useRef(
        new Map<string, HTMLElement>()
    );

    const registerElement = (
        id: string,
        element: HTMLElement | null
    ) => {
        if (element)
            elementRefs.current.set(id, element);
        else
            elementRefs.current.delete(id);
    };

    return {
        state,
        elementRefs,

        dispatch,
        addElement,
        setWidth,
        setWidthUnit,
        setHeight,
        setHeightUnit,
        registerElement,
        dragStart,
        dragMove,
        dragEnd,
        handleClick
    };
}