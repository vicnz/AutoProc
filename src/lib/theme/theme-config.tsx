"use client";

/**
 * * THEME CONFIG
 * * GLOBAL THEME CONFIG
 */

import { ConfigProvider, ThemeConfig, theme } from "antd";
import { PropsWithChildren, memo } from "react";

const { token } = theme.defaultConfig;
export const themeConfig: ThemeConfig = {
    token: {
        ...token,
        colorPrimary: "#C0252A",
        fontFamily: "Poppins-Regular, " + token.fontFamily,
    },
};

type SeedToken = typeof token;

const ThemeConfigProvider = function (props: PropsWithChildren<{ token?: Partial<SeedToken> }>) {
    return (
        <>
            <ConfigProvider theme={{ ...themeConfig, token: { ...themeConfig.token, ...props.token } }}>
                {props.children}
            </ConfigProvider>
        </>
    );
};

export default memo(ThemeConfigProvider);
