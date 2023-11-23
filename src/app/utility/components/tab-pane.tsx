import { CSSProperties, PropsWithChildren, memo } from "react";
//styles
const WrapperStyle: CSSProperties = {
    height: "calc(100vh - 112px)",
    width: "100%",
    position: "relative",
    overflowY: "auto",
};
const ScrollablePane: CSSProperties = {
    height: "auto",
    width: "inherit",
    position: "absolute",
    top: 0,
    left: 0,
    paddingRight: "20px",
};
//
const TabPaneWrapper = function (props: PropsWithChildren<any>) {
    return (
        <div style={WrapperStyle}>
            <div style={ScrollablePane}>{props.children}</div>
        </div>
    );
};

export default memo(TabPaneWrapper);
