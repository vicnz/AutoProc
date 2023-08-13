'use client';

import appTheme from '@lib/theme/default.theme'
import { App, ConfigProvider, theme } from "antd";
import { FC, PropsWithChildren } from "react";
import LayoutStyle from './_styles/page.module.css'

const Layout: FC = (props: PropsWithChildren<{}>) => {
    return (
        <>
            <ConfigProvider theme={appTheme}>
                <App>
                    <div className={LayoutStyle.pageWrapper}>
                        {props.children}
                    </div>
                </App>
            </ConfigProvider>
        </>
    )
}

export default Layout;