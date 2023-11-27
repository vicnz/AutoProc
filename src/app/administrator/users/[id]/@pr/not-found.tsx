"use client";

import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Result } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function NotFound() {
    const router = useRouter();
    return (
        <div>
            <Card>
                <Result
                    title="Error Fetching Purchase Requests"
                    status="500"
                    extra={
                        <>
                            <Button type="dashed" onClick={() => router.back()} icon={<ReloadOutlined />}>
                                Reload
                            </Button>
                        </>
                    }
                />
            </Card>
        </div>
    );
}

export default NotFound;
