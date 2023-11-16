import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { App, ConfigProvider, ThemeConfig } from "antd";

import Header from "./components/header";
import TabRender from "./components/tabs";
//
const WrapperStyle: CSSProperties = {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
};

const ContentStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: "50px 1fr",
    height: "100vh",
    width: "100%",
};

const FontFamily = `'Poppins', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`;
//

const theme: ThemeConfig = {
    token: {
        colorPrimary: "#C0252A",
        fontFamily: FontFamily,
    },
};
const Layout = async function (props: PropsWithChildren<{ checker: ReactNode }>) {
    return (
        <>
            <ConfigProvider theme={theme}>
                <App>
                    <div style={WrapperStyle}>
                        <div style={ContentStyle}>
                            <Header />
                            <TabRender checker={props.checker}>{props.children}</TabRender>
                        </div>
                    </div>
                </App>
            </ConfigProvider>
        </>
    );
};

export default Layout;
