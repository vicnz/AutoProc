export const revalidate = 0;
import "./globals.css";
import { Metadata, Viewport } from "next";
// ─── Utilies ─────────────────────────────────────────────────────────────────
import StyleComponentRegistry from "@lib/theme/theme-registry";
import SWRConfig from "@state/swr/Config";
import SessionAuth from "@lib/auth/SessionProvider";
// ─── Meta Information ────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: "Auto | Proc",
    description: "Auto Procurement System",
};
export const viewport: Viewport = {
    themeColor: "#C0252A",
};
// ─── Layout Base ─────────────────────────────────────────────────────────────
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
