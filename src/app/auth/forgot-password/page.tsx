import { Metadata, Viewport } from "next";
import ClientComponent from "./client";
// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: "AutoProc | Forgot Password",
    description: "Forgot Password",
};
export const viewport: Viewport = {
    themeColor: "#C0252A",
};
// ─── Base Component ──────────────────────────────────────────────────────────
async function ForgotPassword() {
    return <ClientComponent />;
}

export default ForgotPassword;
