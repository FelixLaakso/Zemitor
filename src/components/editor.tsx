import { Preview } from "./editorPreview";
import { useEditor } from "./useEditor";

export function Editor() {
    const editor = useEditor();

    return (
        <div id="zemitor-container">
            <Preview editor={editor} />
            <div className="inputs">
                <input type="number" value={editor.state.elements[editor.state.selectedId ?? ""]?.style.width} onChange={(e) => editor.setWidth(e.target.valueAsNumber)} placeholder="Width" className="w-full" />
                <input type="number" value={editor.state.elements[editor.state.selectedId ?? ""]?.style.height} onChange={(e) => editor.setHeight(e.target.valueAsNumber)} placeholder="Height" className="w-full" />
                <button className="w-full" onClick={editor.addElement}>Add Element</button>
            </div>
        </div>
    )
}