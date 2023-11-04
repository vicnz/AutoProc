"use client";

/**
 * * THEME CONFIG
 * * GLOBAL THEME CONFIG
 */

import { ConfigProvider, ThemeConfig } from "antd";
import { PropsWithChildren, memo } from "react";
//
const FontFamily = `'Poppins', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`;
//

const ThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: "#C0252A",
        fontFamily: FontFamily,
    },
};

const ThemeConfigProvider = function (props: PropsWithChildren<any>) {
    return (
        <>
            <ConfigProvider theme={ThemeConfig}>{props.children}</ConfigProvider>
        </>
    );
};

export default memo(ThemeConfigProvider);
