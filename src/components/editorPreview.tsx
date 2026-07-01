import { ElementRenderer } from "./elementRenderer";
import type { useEditor } from "./useEditor";

type PreviewProps = {
    editor: ReturnType<typeof useEditor>;
};

export function Preview({ editor }: PreviewProps) {
    return (
        <div
            id="zemitor-preview"
            onPointerDown={editor.dragStart}
            onPointerMove={editor.dragMove}
            onPointerUp={editor.dragEnd}
        >
            <ElementRenderer
                editor={editor}
            />
        </div>
    );
}