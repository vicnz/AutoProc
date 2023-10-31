'use client';

/**
 * * SUBHEADER SHOWN ON EVERY TAB
 */
import { Space } from "antd";
import { CSSProperties, PropsWithChildren, ReactNode, memo } from "react";
// styles
const HeaderStyle: CSSProperties = {
    height: "56px",
    borderBottom: "solid lightgray 1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};
//
const SubHeader = function (props: PropsWithChildren<{ leading: ReactNode }>) {
    return (
        <div style={HeaderStyle}>
            <p>{props.leading}</p>
            <Space>
                {props.children}
            </Space>
        </div>
    )
}

export default memo(SubHeader);