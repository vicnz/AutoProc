"use client";

import { useEffect } from "react";
import { Button, Result, Tag } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error("client-error", error);
    }, [error]);

    return (
        <div style={{ height: "100vh", width: "100vw", display: "grid", placeItems: "center" }}>
            <Result
                style={{ width: 600 }}
                title="Client Side Error"
                subTitle="An Unexpected Error Occured, Possibly caused by Poor Network or Low System Memory or page rendering issues"
                extra={
                    <div style={{ textAlign: "center" }}>
                        <p>
                            If Error Persist, Please File a Bug Report on our{" "}
                            <a href="/">
                                Bug Tracker <Tag color="orange">TODO</Tag>
                            </a>
                        </p>
                        <Button icon={<ReloadOutlined />} onClick={() => reset()}>
                            Reload and Retry
                        </Button>
                    </div>
                }
            />
        </div>
    );
}
