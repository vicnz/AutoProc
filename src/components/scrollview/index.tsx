import { CSSProperties, PropsWithChildren, memo } from "react";

const BodyStyle: CSSProperties = {
    padding: 0,
    margin: 0,
    position: "relative",
    width: "100%",
    overflow: "auto",
};

const OverFlowStyle: CSSProperties = {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
};

function ScrollView(props: PropsWithChildren<{ height: number | string }>) {
    const { height, children, ...rest } = props;
    return (
        <div style={{ ...BodyStyle, height }}>
            <div style={{ ...OverFlowStyle, height }}>{children}</div>
        </div>
    );
}

export default memo(ScrollView);
