import { App, ConfigProvider } from "antd";
import React, { PropsWithChildren } from "react";

function AuthLayout(props: PropsWithChildren<any>) {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: "#C0252A", fontFamily: "Poppins" } }}>
            <App>{props.children}</App>
        </ConfigProvider>
    );
}

export default AuthLayout;
