"use client";

import { ReloadOutlined } from "@ant-design/icons";
import { Button, Result, theme } from "antd";
import React, { ReactNode, useEffect } from "react";

function SubComponentView(props: { reload: () => void; error?: any; title?: ReactNode; subTitle?: ReactNode }) {
    const { token } = theme.useToken();

    useEffect(() => {
        console.log(props?.error);
    }, [props.error]);

    return (
        <div
            style={{
                padding: 10,
                height: "100%",
                width: "100%",
                display: "grid",
                placeItems: "center",
                background: token.colorError + "30",
            }}
        >
            <Result
                title={props.title || "An Error Occured"}
                subTitle={props.subTitle || "An Unexpected Error Occured, Please Refresh the Page"}
                status="error"
                extra={
                    <Button icon={<ReloadOutlined />} type="text" onClick={props.reload}>
                        Reset
                    </Button>
                }
            />
        </div>
    );
}

export default SubComponentView;
