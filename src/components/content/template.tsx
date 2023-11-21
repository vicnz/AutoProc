"use client";

import { theme } from "antd";
import { PropsWithChildren } from "react";
import { TemplateStyle } from "./styles";

export default function ShadedContainer(props: PropsWithChildren<any>) {
    const { token } = theme.useToken();
    return (
        <div style={{ ...TemplateStyle, background: token.colorBgLayout }} {...props}>
            {props.children}
        </div>
    );
}
