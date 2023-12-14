"use client";

import { theme } from "antd";
import React, { CSSProperties, PropsWithChildren } from "react";

const navStyle: CSSProperties = {
    height: "56px",
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

function Wrapper(props: PropsWithChildren<any>) {
    const { token } = theme.useToken();
    return <nav style={{ ...navStyle, backgroundColor: token.colorBgContainer }}>{props.children}</nav>;
}

export default Wrapper;
