import { Metadata, Viewport } from "next";
import GlobalNotFound from "@components/not-found";

export const metadata: Metadata = {
    title: "AutoProc | Login",
    description: "Login to Auto Procurement System",
};

export const viewport: Viewport = {
    themeColor: "#C0252A",
};

function PageNotFound() {
    return <GlobalNotFound />;
}

export default PageNotFound;
