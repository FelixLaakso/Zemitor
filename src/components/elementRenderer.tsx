import type { useEditor } from "./useEditor";

type Props = {
    editor: ReturnType<typeof useEditor>;
    elementId?: string;
};

export function ElementRenderer({
    editor,
    elementId
}: Props) {

    if (!elementId) {
        return (
            <>
                {
                    editor.state.tree.rootIds.map((rootId) => (
                        <ElementRenderer
                            editor={editor}
                            elementId={rootId}
                        />
                    ))
                }
            </>
        );
    }

    const element = editor.state.elements[elementId];

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
            {editor.state.tree.children[element.id]?.map((child) => (
                <ElementRenderer
                    editor={editor}
                    elementId={child}
                />
            ))}
        </div>
    );
}