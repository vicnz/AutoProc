//libs
import { PropsWithChildren } from "react";
//components
import Layout from '@components/admin/root-layout';
import { MonitorDeliveries } from '@state/schedules/delivery'
//
//
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