'use client'

//libs
import { Space } from "antd"
import { ReactNode, memo } from "react"
//components
//config
//
export const Header = memo(function (props: { title: ReactNode, children?: ReactNode }) {
    return (
        <div id="header-container" style={{ height: '56px', width: 'inherit', padding: '10px 15px', borderBottom: '1px solid lightgray', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space id="header-title">
                {props.title}
            </Space>
            <Space id="header-actions">
                {props.children}
            </Space>
        </div>
    )
})

export const HeaderWithBack = memo(function (props: { title: ReactNode, children?: ReactNode, back?: ReactNode }) {
    return (
        <div id="header-container" style={{ height: '56px', width: 'inherit', padding: '10px 15px', borderBottom: '1px solid lightgray', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space id="header-title">
                {props.back}
                {props.title}
            </Space>
            <Space id="header-actions">
                {props.children}
            </Space>
        </div>
    )
})