"use client";

import ShadedContainer from "@components/admin/content/container";
import { Skeleton } from "antd";
import React from "react";

function SupplierLoadingComponent() {
    return (
        <ShadedContainer>
            <div style={{ padding: 15 }}>
                <Skeleton active />
            </div>
        </ShadedContainer>
    );
}

export default SupplierLoadingComponent;