import { Metadata, Viewport } from "next";
import ClientComponent from "./client";
import { preload } from "./preload";
// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: "AutoProc | Forgot Password",
    description: "Forgot Password",
};
export const viewport: Viewport = {
    themeColor: "#C0252A",
};

export const revalidate = 60;
// ─── Base Component ──────────────────────────────────────────────────────────
async function UpdatePassword(props: { params: { id: string }; searchParams: { token: string } }) {
    const { userid } = await preload(props.searchParams.token);
    return <ClientComponent userid={userid} token={props.searchParams.token} />;
}

export default UpdatePassword;
