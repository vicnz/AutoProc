import { App, ConfigProvider } from "antd";
import React, { PropsWithChildren } from "react";

function AuthLayout(props: PropsWithChildren<any>) {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: "#C0252A", fontFamily: "Poppins" } }}>
            <App>
                <div
                    style={{
                        height: "100vh",
                        width: "100vw",
                        background:
                            "radial-gradient(circle, transparent 25%, #FFFFFF  26%),linear-gradient(0deg, transparent 44%, #38424F 45%, #38424F 55%, transparent 56%), linear-gradient(90deg, transparent 44%, #38424F 45%, #38424F 55%, transparent 56%)",
                        backgroundSize: "2em 2em",
                        backgroundColor: "white",
                        opacity: 0.2,
                    }}
                >
                    {props.children}
                </div>
            </App>
        </ConfigProvider>
    );
}

export default AuthLayout;
