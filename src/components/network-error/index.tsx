"use client";

import { Result } from "antd";
import { PropsWithChildren, memo } from "react";

const content = {
    title: "Network Error",
    subTitle: "Refresh Page or Try Again Later",
};
const NetworkError = function (
    props: PropsWithChildren<{ title?: string; subTitle?: string }>
) {
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Result
                status={"error"}
                title={props.title || content.title}
                subTitle={props.subTitle || content.subTitle}
                extra={props.children}
            />
        </div>
    );
};

export default memo(NetworkError);
