import { Spin } from "antd";

function Loading() {
    return (
        <div style={{ height: "100vh", width: "100vw", display: "grid", placeItems: "center" }}>
            <Spin size="large" />
        </div>
    );
}

export default Loading;
