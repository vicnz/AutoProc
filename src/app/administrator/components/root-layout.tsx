"use client";

import { PropsWithChildren, ReactNode } from "react";
import { App, theme } from "antd";

import Styles from "./layout.module.css";

const RootLayout = function (props: PropsWithChildren<{ Topbar: ReactNode; Navbar: ReactNode }>) {
    const { token } = theme.useToken();
    const { Topbar, Navbar } = props;
    return (
        <>
            <App>
                <div className={Styles.layout_wrapper} style={{ backgroundColor: token.colorBgContainer }}>
                    {/* <Topbar /> */}
                    {Topbar}
                    <div className={Styles.content_provider} style={{ backgroundColor: token.colorBgContainer }}>
                        {/* <Navbar /> */}
                        {Navbar}
                        <div className={Styles.content} style={{ backgroundColor: "transparent" }}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </App>
        </>
    );
};

export default RootLayout;
