import { Metadata, Viewport } from "next";
import ForgotPassword from "./client";
import { preload } from "./preload";
// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: "AutoProc | Forgot Password",
    description: "Forgot Password",
};
export const viewport: Viewport = {
    themeColor: "#C0252A",
};
// ─── Base Component ──────────────────────────────────────────────────────────
async function ForgetPassword(props: { params: { id: string }; searchParams: [] }) {
    const preloaded = await preload(props.params.id);
    return <ForgotPassword answers={preloaded.data} userId={props.params.id} id={preloaded.id} />;
}

export default ForgetPassword;
