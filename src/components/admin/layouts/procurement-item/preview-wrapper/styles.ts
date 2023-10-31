import { CSSProperties } from 'react'

export const WrapperStyles: CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
    overflowY: "auto",
    backgroundSize: "2em 2em",
};

export const ScrollStyle: CSSProperties = {
    position: "absolute",
    height: "auto",
    top: 0,
    left: 0,
    padding: "25px 0",
    display: "grid",
    placeItems: "center",
    width: "inherit",
};

export const PreviewPaneStyle: CSSProperties = {
    display: "grid",
    placeItems: "center",
};

export const PrintablePaneStyle: CSSProperties = {
    minWidth: "inherit",
    backgroundColor: "white",
    borderRadius: 8,
    color: "darkslategray",
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
    padding: "0px 0 15px 0", //15px 0
};

//header styles
export const HeaderStyle: CSSProperties = {
    display: "grid",
    placeItems: "center",
    width: 'inherit'
    // padding: "10px 25px",
};