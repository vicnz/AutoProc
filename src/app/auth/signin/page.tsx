import { Metadata, Viewport } from "next";
import LoginPage from "./login-client";
// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: "AutoProc | Sign In",
    description: "Sign In to Auto Procurement System",
};
export const viewport: Viewport = {
    themeColor: "#C0252A",
};
// ─── Base Component ──────────────────────────────────────────────────────────
async function CredentialsSignin() {
    return <LoginPage />;
}

export default CredentialsSignin;
