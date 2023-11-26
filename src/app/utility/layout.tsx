import { PropsWithChildren } from "react";
import ThemeConfig from "@lib/theme/theme-config";
import { THEME_COLORS } from "@lib/theme/constant";
import { App } from "antd";
import Scrollview from "@components/scrollview";
import Header from "./components/header";
// ─────────────────────────────────────────────────────────────────────────────
function UtilityUserLayout(props: PropsWithChildren<any>) {
    return (
        <>
            <ThemeConfig token={{ colorPrimary: THEME_COLORS.PRIMARY }}>
                <App>
                    <div style={{ display: "grid", gridTemplateRows: "56px 1fr" }}>
                        <Header />
                        <Scrollview height={"calc(100vh - 56px)"}>{props.children}</Scrollview>
                    </div>
                </App>
            </ThemeConfig>
        </>
    );
}

export default UtilityUserLayout;
