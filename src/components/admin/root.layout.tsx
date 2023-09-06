
'use client';

import ThemeContextWrapper from '@lib/theme/theme.context'
import { PropsWithChildren } from 'react'
import { App, theme } from 'antd'
import Style from './styles/root.module.css'
import Topbar from './topbar'
import Navbar from './navbar'

const { useToken } = theme
//Preload System Shared Data Here
const AdminRootLayout = (props: PropsWithChildren<any>) => {
    const { token } = useToken()
    return (
        <ThemeContextWrapper>
            <App>
                <div className={Style.layout_wrapper} style={{ background: token.colorBgContainer }}>
                    <Topbar />
                    <div className={Style.content_provider} style={{ background: token.colorBgContainer }}>
                        <Navbar />
                        <div className={Style.content} style={{ background: 'transparent' }}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </App>
        </ThemeContextWrapper>
    )
}


export default AdminRootLayout;