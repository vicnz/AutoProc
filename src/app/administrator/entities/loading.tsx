"use client";

import { Template } from '@components/content'
import { Skeleton } from "antd";
import React from "react";

function EntitiesLoading() {
    return (
        <Template>
            <div style={{ padding: 15 }}>
                <Skeleton active />
            </div>
        </Template>
    );
}

export default EntitiesLoading;
