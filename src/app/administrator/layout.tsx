//libs
import { PropsWithChildren } from "react";
//components
import Layout from '@components/admin/root-layout';
//
//
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