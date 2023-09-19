'use client';
//libs
import { PropsWithChildren } from "react";
import { App, theme } from 'antd'
//components
import Classes from '@styles/admin/base-layout.module.css'
import AntDesignThemeContext from '@lib/theme/theme.context'
import Topbar from '@components/admin/top-bar'
import Navbar from '@components/admin/nav-bar'
//
const { useToken } = theme
//
const AdministratorLayout = function (props: PropsWithChildren<any>) {
    const { token } = useToken()
    return (
        <>
            <AntDesignThemeContext>
                <App>
                    <div className={Classes.layout_wrapper} style={{ backgroundColor: token.colorBgContainer }}>
                        <Topbar />
                        <div className={Classes.content_provider} style={{ backgroundColor: token.colorBgContainer }}>
                            <Navbar />
                            <div className={Classes.content} style={{ backgroundColor: 'transparent' }}>
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