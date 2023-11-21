"use client";

import { Card, Result, Skeleton, Tag } from "antd";
import React, { ReactNode } from "react";

export function Loading(props: { height: number }) {
    return (
        <Card
            title={
                <>
                    <Skeleton.Input active />
                </>
            }
            style={{ height: props.height }}
            loading
        >
            <Skeleton active />
        </Card>
    );
}

//ERROR VIEW
export function Error(props: { height: number; children: ReactNode }) {
    return (
        <Card title={<>{props.children}</>} style={{ height: props.height }} loading>
            <Result status="error" title="Failed To Fetch Data" subTitle="Please Reload Page" />
        </Card>
    );
}
