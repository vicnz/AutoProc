"use client";
//libs
import { PropsWithChildren } from "react";
import { App, theme } from "antd";
//components
import Styles from "./root-layout.module.css";
// import AntDesignThemeContext from "@lib/theme/theme.context";
import AntDConfigProvider from '@lib/theme/theme.provider'
import Topbar from "@components/admin/topbar";
import Navbar from "@components/admin/navbar";
//
const AdministratorLayout = function (props: PropsWithChildren<any>) {
    const { token } = theme.useToken();
    return (
        <>
            <AntDConfigProvider>
                <App>
                    <div
                        className={Styles.layout_wrapper}
                        style={{ backgroundColor: token.colorBgContainer }}
                    >
                        <Topbar />
                        <div
                            className={Styles.content_provider}
                            style={{ backgroundColor: token.colorBgContainer }}
                        >
                            <Navbar />
                            <div
                                className={Styles.content}
                                style={{ backgroundColor: "transparent" }}
                            >
                                {props.children}
                            </div>
                        </div>
                    </div>
                </App>
            </AntDConfigProvider>
        </>
    );
};

export default AdministratorLayout;
