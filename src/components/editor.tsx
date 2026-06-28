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
                    <div className="radio-group">
                        <label className="radio">
                            <input type="radio" name="widthUnit" checked={editor.state.elements[editor.state.selectedId ?? ""]?.widthUnit === "px"} onChange={() => editor.setWidthUnit("px")} />
                            <span></span>
                            px
                        </label>

                        <label className="radio">
                            <input type="radio" name="widthUnit" checked={editor.state.elements[editor.state.selectedId ?? ""]?.widthUnit === "%"} onChange={() => editor.setWidthUnit("%")} />
                            <span></span>
                            %
                        </label>
                    </div>
                </div>
                <div className="half">
                    <input type="number" name="height" value={editor.state.elements[editor.state.selectedId ?? ""]?.height ?? ""} onChange={(e) => editor.setHeight(e.target.valueAsNumber)} placeholder="Height" />
                    <div className="radio-group">
                        <label className="radio">
                            <input type="radio" name="heightUnit" checked={editor.state.elements[editor.state.selectedId ?? ""]?.heightUnit === "px"} onChange={() => editor.setHeightUnit("px")} />
                            <span></span>
                            px
                        </label>

                        <label className="radio">
                            <input type="radio" name="heightUnit" checked={editor.state.elements[editor.state.selectedId ?? ""]?.heightUnit === "%"} onChange={() => editor.setHeightUnit("%")} />
                            <span></span>
                            %
                        </label>
                    </div>
                </div>
                <button onClick={editor.addElement}>Add Element</button>
            </div>
        </div>
    )
}