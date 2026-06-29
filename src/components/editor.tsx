import { Preview } from "./editorPreview";
import { useEditor } from "./useEditor";

export function Editor() {
    const editor = useEditor();

    return (
        <div id="zemitor-container">
            <Preview editor={editor} />
            <div className="inputs">
                <div className="half">
                    <input type="number" name="width" value={editor.state.elements[editor.state.selectedId ?? ""]?.width ?? ""} onChange={(e) => editor.setWidth(e.target.valueAsNumber)} placeholder="Width" />
                    <input type="text" name="widthUnit" value={editor.state.elements[editor.state.selectedId ?? ""]?.widthUnit ?? ""} onChange={(e) => editor.setWidthUnit(e.target.value)} placeholder="Unit" />
                </div>
                <div className="half">
                    <input type="number" name="height" value={editor.state.elements[editor.state.selectedId ?? ""]?.height ?? ""} onChange={(e) => editor.setHeight(e.target.valueAsNumber)} placeholder="Height" />
                    <input type="text" name="heightUnit" value={editor.state.elements[editor.state.selectedId ?? ""]?.heightUnit ?? ""} onChange={(e) => editor.setHeightUnit(e.target.value)} placeholder="Unit" />
                </div>
                <button onClick={editor.addElement}>Add Element</button>
            </div>
        </div>
    )
}