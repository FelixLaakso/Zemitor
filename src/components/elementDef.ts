import type { CSSProperties } from "react";

export interface ElementDef {
    id: string;

    position: "absolute" | "fixed" | "relative";
    display: "block" | "flex" | "inline-block" | "inline-flex" | "grid" | "inline-grid" | "none";
    x: number;
    y: number;

    width: number;
    height: number;
    widthUnit: string;
    heightUnit: string;

    style: CSSProperties;
}