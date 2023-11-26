import { Spin } from "antd";

function Loading() {
    return (
        <div style={{ height: "calc(100vh - 56px)", display: "grid", placeItems: "center" }}>
            <Spin spinning size="default" />
        </div>
    );
}

export default Loading;
