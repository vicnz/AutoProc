'use client';

//TODO Change This Layout to Server Component
//TODO Initialize ChartJS Here
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, registerables } from 'chart.js'
import Contents from "../_components/contents";
import { usePathname } from "next/navigation";
import { Button, Divider, DropDownProps, Dropdown, List } from "antd";
import { FileExcelOutlined, MoreOutlined, PrinterOutlined, ReloadOutlined } from "@ant-design/icons";

const dropdownProps: DropDownProps = {
    children: <List></List>
}
export default function DashboardLayout({ children, ...props }: { children: ReactNode }) {

    useEffect(() => {
        ChartJS.register(...registerables);
    }, [])

    return (
        <Contents title={'Dashboard'}
            actions={
                <>
                    <Button icon={<ReloadOutlined />} type="text">Reload</Button>
                    <Button icon={<PrinterOutlined />} type="text">Print</Button>
                    <Divider type="vertical" />
                    <Button icon={<MoreOutlined />} type='text'></Button>
                </>
            }
        >
            {children}
        </Contents >
    )
}