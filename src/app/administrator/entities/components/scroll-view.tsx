import React, { PropsWithChildren } from "react";

type props = {
    height?: number;
};
function ScrollView(props: PropsWithChildren<props>) {
    return (
        <div
            style={{
                position: "relative",
                overflowY: "auto",
                height: props.height || "100%",
                width: "100%",
            }}
        >
            <div style={{ height: "auto", width: "100%", position: "absolute", top: 0, left: 0 }}>{props.children}</div>
        </div>
    );
}

export default ScrollView;
