'use client';

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { MouseEventHandler } from "react";

export default function BackButton({ onClick }: { onClick: MouseEventHandler }) {
    return (
        <>
            <Button type='text' icon={<ArrowLeftOutlined />} onClick={onClick}>Back</Button>
            <Divider type='vertical' />
        </>
    )
}