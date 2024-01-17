import { App } from "antd";
import { PropsWithChildren } from "react";
import Config from "@lib/theme/theme-config";
import { THEME_COLORS } from "@lib/theme/constant";
import { adminExists } from '@lib/init/undefined-admin'
import { redirect } from "next/navigation";

const preload = async () => {
    return await adminExists()
}
// ─── Component Base ──────────────────────────────────────────────────────────
async function AuthLayout(props: PropsWithChildren<any>) {
    // if (await preload()) redirect('/init');
    return (
        <Config token={{ colorPrimary: THEME_COLORS.PRIMARY }}>
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
        </Config>
    );
}

export default AuthLayout;
