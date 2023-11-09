//libs
import { PropsWithChildren } from "react";
//components
import Layout from "@components/admin/root-layout";

/**
 * * START SCHEDULE CHECK FOR DELAYED MONITORED ITEMS
 */
import { MonitorDeliveries } from "@state/schedules/delivery";
const monitorDelivery = MonitorDeliveries();
monitorDelivery.start();

//FIXME run only once -> build a logic that prevents it from re-initializing every serve component build

const RootLayout = function (props: PropsWithChildren<any>) {
    return (
        <>
            <Layout>{props.children}</Layout>
        </>
    );
};

export default RootLayout;
