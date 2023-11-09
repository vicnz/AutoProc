import { Skeleton } from "antd";

function LoadingRequests() {
    return (
        <div style={{ padding: 10 }}>
            <Skeleton active />
        </div>
    );
}

export default LoadingRequests;
