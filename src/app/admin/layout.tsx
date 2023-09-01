'use client';

import ThemeContextWrapper from '@lib/theme/theme'
import { PropsWithChildren } from 'react'
import { theme } from 'antd'
import Style from './layout.module.css'
import Topbar from './_components/topbar'
import Navbar from './_components/navbar'

const { useToken } = theme
//Preload System Shared Data Here
const AdminRootLayout = (props: PropsWithChildren<any>) => {
    const { token } = useToken()
    return (
        <ThemeContextWrapper>
            <div className={Style.layout_wrapper} style={{ background: token.colorBgContainer }}>
                <Topbar />
                <div className={Style.content_provider} style={{ background: token.colorBgContainer }}>
                    <Navbar />
                    <div className={Style.content} style={{ background: 'transparent' }}>
                        {props.children}
                    </div>
                </div>
            </div>
        </ThemeContextWrapper>
    )
}


export default AdminRootLayout;