import { Metadata, Viewport } from "next";
import LogoutPage from "./logout-client";
// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: "AutoProc | Sign Out",
    description: "Sign Out to Auto Procurement System",
};
export const viewport: Viewport = {
    themeColor: "#C0252A",
};
// ─── Base Component ──────────────────────────────────────────────────────────
async function Logout() {
    return <LogoutPage />;
}

export default Logout;
