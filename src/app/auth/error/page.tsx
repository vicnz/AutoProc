import { Metadata, Viewport } from "next";
import ErrorMessage from "./error-message";

export const metadata: Metadata = {
    title: "AutoProc | Login",
    description: "Login to Auto Procurement System",
};

export const viewport: Viewport = {
    themeColor: "#C0252A",
};

async function CredentialsSignin() {
    return (
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
            <ErrorMessage />
        </div>
    );
}

export default CredentialsSignin;
