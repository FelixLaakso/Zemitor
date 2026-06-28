import type { ElementDef } from "./elementDef";
import type { useEditor } from "./useEditor";

type Props = {
    editor: ReturnType<typeof useEditor>;
    element: ElementDef;
};

export function ElementRenderer({
    editor,
    element,
}: Props) {

    const parsedStyle: React.CSSProperties = {
        ...element.style,
        width: `${element.width}${element.widthUnit}`,
        height: `${element.height}${element.heightUnit}`,
        display: element.display,
        position: element.position,
        left: `${element.x}px`,
        top: `${element.y}px`,
    };

    return (
        <div
            ref={(el) =>
                editor.registerElement(element.id, el)
            }
            id={element.id}
            style={parsedStyle}
        >
            {element.children?.map((child) => (
                <ElementRenderer
                    key={child.id}
                    editor={editor}
                    element={child}
                />
            ))}
        </div>
    );
}