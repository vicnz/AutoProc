import { PropsWithChildren } from "react";
import Layout from "@components/admin/root-layout";
// import InitMonitoring from "@state/schedules/init-monitoring";
//FIXME run only once -> build a logic that prevents it from re-initializing every server component build

const RootLayout = function (props: PropsWithChildren<any>) {
    return (
        <>
            {/* <InitMonitoring /> */}
            <Layout>{props.children}</Layout>
        </>
    );
};

export default RootLayout;
