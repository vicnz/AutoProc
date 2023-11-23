import { Metadata, Viewport } from "next";
import ErrorMessage from "./error-message";
// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: "AutoProc | Login",
    description: "Login to Auto Procurement System",
};

export const viewport: Viewport = {
    themeColor: "#C0252A",
};
// ─── Component Base ──────────────────────────────────────────────────────────
async function AuthError() {
    return <ErrorMessage />;
}

export default AuthError;
