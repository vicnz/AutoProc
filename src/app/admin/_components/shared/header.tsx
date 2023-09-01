'use client';

import { Space } from "antd";
import { ReactNode } from "react";

type ISectionProps = {
    children: ReactNode,
    back?: ReactNode,
    dir?: string,
    title: string
}
const SectionHeader = (props: ISectionProps) => {
    return (
        <>
            <div id="header-container" style={{ height: '56px', width: 'inherit', padding: '10px 15px', borderBottom: '1px solid lightgray', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space id="header-title">
                    {props.back}
                    {props.title}
                    {/* TODO create the breadcrumb */}
                </Space>
                <Space id="header-actions">
                    {props.children}
                </Space>
            </div>
        </>
    )
}


export default SectionHeader;