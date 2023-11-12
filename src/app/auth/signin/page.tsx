import { Metadata, Viewport } from "next";
import LoginPage from "./login-client";

export const metadata: Metadata = {
    title: "AutoProc | Sign In",
    description: "Sign In to Auto Procurement System",
};

export const viewport: Viewport = {
    themeColor: "#C0252A",
};

async function CredentialsSignin() {
    return <LoginPage />;
}

export default CredentialsSignin;
