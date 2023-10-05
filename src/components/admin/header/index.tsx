"use client";

//libs
import { Space } from "antd";
import { CSSProperties, ReactNode, memo } from "react";
//styles
const HeaderStyles: CSSProperties = {
    height: "56px",
    width: "inherit",
    padding: "10px 15px",
    borderBottom: "1px solid lightgray",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};
//types
interface GlobalHeaderProps {
    title: ReactNode,
    children?: ReactNode,
    back?: ReactNode
}
//(!Global Header is only used as Route Header not Subsection Header)
const GlobalHeader = function (props: GlobalHeaderProps) {
    return (
        <div id="header-container" style={HeaderStyles}>
            <Space id="header-title">
                {props.back}
                {props.title}
            </Space>
            <Space id="header-actions">{props.children}</Space>
        </div>
    );
};

export default memo(GlobalHeader);
