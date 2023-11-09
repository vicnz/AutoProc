import { Skeleton } from "antd";
import React from "react";

function loading() {
    return (
        <div style={{ padding: 15 }}>
            <Skeleton active />
        </div>
    );
}

export default loading;
