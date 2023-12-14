import { PropsWithChildren } from "react";

import AntDConfigProvider from "@lib/theme/theme-config";
import LayoutContent from "./components/root-layout";
import Topbar from "./components/topbar";
import Navbar from "./components/navbar";

const RootLayout = function (props: PropsWithChildren<any>) {
    return (
        <>
            <AntDConfigProvider>
                <LayoutContent Navbar={<Navbar />} Topbar={<Topbar />}>
                    {props.children}
                </LayoutContent>
            </AntDConfigProvider>
        </>
    );
};

export default RootLayout;
