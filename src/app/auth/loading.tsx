import { Spin } from "antd";

function Loading() {
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Spin size="large" />
        </div>
    );
}

export default Loading;
