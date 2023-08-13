'use client';

import { ReactNode, useMemo } from "react";
import Contents from "../_components/contents";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "antd";
import { ArrowLeftOutlined, DeleteOutlined, FileExcelOutlined, MoreOutlined, PrinterOutlined, ReloadOutlined } from "@ant-design/icons";
import React from "react";

export default function SettingsLayout({ children, ...props }: { children: ReactNode }) {
    const path = usePathname()
    const router = useRouter()
    const isHome: boolean = useMemo(() => { return path.split('/').length > 3 }, [path])
    return (
        <Contents
            title={''}
            hasBack={isHome ? <Button onClick={() => router.back()} type='text' icon={<ArrowLeftOutlined />}>Back</Button> : null}
            actions={
                <>
                    <Button icon={<MoreOutlined />} type="text"></Button>
                </>
            }
        >
            {children}
        </Contents >
    )
}