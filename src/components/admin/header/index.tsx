'use client'

//libs
import { Space } from "antd"
import { CSSProperties, ReactNode, memo } from "react"
//components
//config
//
const HeaderStyles: CSSProperties = {
    height: "56px",
    width: "inherit",
    padding: "10px 15px",
    borderBottom: "1px solid lightgray",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const Header = memo(function (props: { title: ReactNode, children?: ReactNode, back?: ReactNode }) {
    return (
        <div id="header-container" style={HeaderStyles}>
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

export default Header;