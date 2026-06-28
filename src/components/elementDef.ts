import type { CSSProperties } from "react";

export interface ElementDef {
    id: string;
    style: CSSProperties;

    children: ElementDef[];
}