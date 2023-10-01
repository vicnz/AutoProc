'use client';
//libs
import { PropsWithChildren } from "react";
import { App, theme } from 'antd'
//components
import Styles from './root-layout.module.css'
import AntDesignThemeContext from '@lib/theme/theme.context'
import Topbar from '@components/admin/topbar'
import Navbar from '@components/admin/navbar'
//
const { useToken } = theme
//
const AdministratorLayout = function (props: PropsWithChildren<any>) {
    const { token } = useToken()
    return (
        <>
            <AntDesignThemeContext>
                <App>
                    <div className={Styles.layout_wrapper} style={{ backgroundColor: token.colorBgContainer }}>
                        <Topbar />
                        <div className={Styles.content_provider} style={{ backgroundColor: token.colorBgContainer }}>
                            <Navbar />
                            <div className={Styles.content} style={{ backgroundColor: 'transparent' }}>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </App>
            </AntDesignThemeContext>
        </>
    )
}

export default AdministratorLayout;