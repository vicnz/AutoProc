"use client";

import { ConfigProvider, ThemeConfig } from "antd";
import { PropsWithChildren } from "react";

const ThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: "#C0252A",
    },
};

const ThemeConfigProvider = function (props: PropsWithChildren<any>) {
    return (
        <>
            <ConfigProvider theme={ThemeConfig}>{props.children}</ConfigProvider>
        </>
    );
};

export default ThemeConfigProvider;
