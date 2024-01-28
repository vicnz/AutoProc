"use client";

import { Template as ShadedContainer } from '@components/content'
import { Skeleton } from "antd";
import React from "react";

function RootLoadingComponent() {
    return (
        <ShadedContainer>
            <div style={{ padding: 15 }}>
                <Skeleton active />
            </div>
        </ShadedContainer>
    );
}

export default RootLoadingComponent;
