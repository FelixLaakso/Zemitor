import { useEditor } from "./useEditor";

export function Editor() {
    const editor = useEditor();

    return (
        <div id="zemitor-container">
            <editor.preview />
            <div className="inputs">
                <input type="text" value={editor.state.elements[editor.state.selectedId ?? ""]?.style.width} onChange={(e) => editor.setWidth(e.target.value)} placeholder="Width" className="w-full" />
                <input type="text" value={editor.state.elements[editor.state.selectedId ?? ""]?.style.height} onChange={(e) => editor.setHeight(e.target.value)} placeholder="Height" className="w-full" />
                <button className="w-full" onClick={editor.addElement}>Add Element</button>
            </div>
        </div>
    )
}