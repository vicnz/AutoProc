import { Metadata, Viewport } from "next";
import GlobalNotFound from "@components/not-found";
import Config from "@lib/theme/theme-config";
// ─── Meta Information ────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: "AutoProc | Login",
    description: "Login to Auto Procurement System",
};

export const viewport: Viewport = {
    themeColor: "#C0252A",
};
// ─── Page Not Found Base ─────────────────────────────────────────────────────
function PageNotFound() {
    return (
        <Config token={{ colorPrimary: "#C0252A" }}>
            <GlobalNotFound />
        </Config>
    );
}

export default PageNotFound;
