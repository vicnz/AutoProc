import { PropsWithChildren } from "react";
import AntDConfig from '@lib/theme/theme-config';
import { App } from 'antd';
const Layout = function (props: PropsWithChildren<any>) {
    return (
        <>
            <AntDConfig>
                <App>
                    {props.children}
                </App>
            </AntDConfig>
        </>
    )
}

export default Layout;