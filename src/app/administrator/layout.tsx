//libs
import { PropsWithChildren } from "react";
//components
import Layout from '@components/admin/root-layout';


/**
 * * START SCHEDULE CHECK FOR DELAYED MONITORED ITEMS
 */
import { MonitorDeliveries } from '@state/schedules/delivery'
//! FIXME : Being Recalled Every Page Transition
const monitorDelivery = MonitorDeliveries()
monitorDelivery.start();

const RootLayout = function (props: PropsWithChildren<any>) {
    return (
        <>
            <Layout>
                {props.children}
            </Layout>
        </>
    )
}

export default RootLayout;