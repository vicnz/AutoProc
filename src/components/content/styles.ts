import { CSSProperties } from "react";

//Wrapper
export const WrapperStyles: CSSProperties = {
    height: "calc(100vh - 56px)",
    width: "calc(100vw - 56px)",
    borderRadius: "8px 0 0 0",
    display: "grid",
    gridTemplateRows: "56px 1fr",
};

export const BodyStyles: CSSProperties = {
    height: "calc(100vh - 112px)",
    width: "100%",
    position: "relative",
    overflowY: "auto",
};

export const BodyScrollStyles: CSSProperties = {
    height: "auto",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
};

//template
export const TemplateStyle: CSSProperties = {
    height: "calc(100vh - 56px)",
    width: "calc(100vw - 56px)",
    borderRadius: "8px 0 0 0",
}