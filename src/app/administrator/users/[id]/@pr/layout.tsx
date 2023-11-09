import React from "react";

function PrLayout(props: any) {
    return (
        <div style={{ height: "calc(100vh - 112px)", position: "relative", overflowY: "auto", width: "100%" }}>
            <div style={{ height: "auto", position: "absolute", top: 0, left: 0, width: "100%", padding: 10 }}>
                {props.children}
            </div>
        </div>
    );
}

export default PrLayout;
