import StyleComponentRegistry from "@/lib/theme/antd";
import SWRConfig from "@state/swr/Config";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto | Proc",
  description: "Auto Procurement System",
  themeColor: "#C0252A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SWRConfig>
          <StyleComponentRegistry>{children}</StyleComponentRegistry>
        </SWRConfig>
      </body>
    </html>
  );
}
