"use client";

import { ConfigProvider, ThemeConfig } from "antd";
import { PropsWithChildren } from "react";

const theme: ThemeConfig = {
    token: {
        colorPrimary: "#C0252A",
    },
};

const ThemeConfigProvider = function (props: PropsWithChildren<any>) {
    return (
        <>
            <ConfigProvider theme={theme}>{props.children}</ConfigProvider>
        </>
    );
};

export default ThemeConfigProvider;
