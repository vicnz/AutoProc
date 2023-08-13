'use client';

//TODO Change This Layout to Server Component
//TODO Initialize ChartJS Here
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, registerables } from 'chart.js'
import Contents from "../../_components/contents";
import { Button, Divider, Dropdown } from "antd";
import { FileExcelOutlined, MoreOutlined, PrinterOutlined } from "@ant-design/icons";

export default function UsersLayout({ children, ...props }: { children: ReactNode }) {

    useEffect(() => {
        ChartJS.register(...registerables);
    }, [])

    return (
        <Contents title={'Dashboard'}
            actions={
                <>
                    {/* <Button icon={<PrinterOutlined />} type="text">Export</Button> */}
                    <Divider type="vertical" />
                    <Button icon={<MoreOutlined />} type="text"></Button>
                </>
            }
        >
            {children}
        </Contents >
    )
}