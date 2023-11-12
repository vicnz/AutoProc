import { Metadata, Viewport } from "next";
import LogoutPage from "./logout-client";

export const metadata: Metadata = {
    title: "AutoProc | Sign Out",
    description: "Sign Out to Auto Procurement System",
};

export const viewport: Viewport = {
    themeColor: "#C0252A",
};

async function Logout() {
    return <LogoutPage />;
}

export default Logout;
