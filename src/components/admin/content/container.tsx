'use client';

import { theme } from "antd";
import { CSSProperties, PropsWithChildren } from "react";

const WrapperStyle: CSSProperties = {
    height: "calc(100vh - 56px)",
    width: "calc(100vw - 56px)",
    borderRadius: "8px 0 0 0",
}
export default function ShadedContainer(props: PropsWithChildren<any>) {
    const { token } = theme.useToken()
    return (
        <div style={{ ...WrapperStyle, background: token.colorBgLayout }} {...props}>
            {props.children}
        </div>
    )
}