import "./globals.css";
import StyleComponentRegistry from "@lib/theme/theme-registry";
import SWRConfig from "@state/swr/Config";
import { Metadata, Viewport } from "next";
import SessionAuth from "@lib/auth/SessionProvider";

export const metadata: Metadata = {
    title: "Auto | Proc",
    description: "Auto Procurement System",
};

export const viewport: Viewport = {
    themeColor: "#C0252A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <SessionAuth>
                    <SWRConfig>
                        <StyleComponentRegistry>{children}</StyleComponentRegistry>
                    </SWRConfig>
                </SessionAuth>
            </body>
        </html>
    );
}
