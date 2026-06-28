import type { ElementDef } from "./elementDef";

export function ElementRenderer({ element }: { element: ElementDef }) {

    return (
        <div
            id={element.id}
            className="element"
            style={element.style}>

            {
                element.children?.map((child) => (
                    <ElementRenderer key={child.id} element={child} />
                ))
            }

        </div>
    );
}