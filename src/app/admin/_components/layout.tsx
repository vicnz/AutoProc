'use client';

//!APP ROOT LAYOUT
import { App, ConfigProvider, theme, } from 'antd'
//themes
import DefaultTheme from '@lib/theme/default.theme'
//styles
import LayoutStyle from '@/app/admin/_styles/layout.module.css'
//components
import TopBar from '@/app/admin/_components/topbar';
import Navbar from '@/app/admin/_components/navbar'
//context
import { useToggleTheme } from '@lib/theme/theme.context'
const { useToken, darkAlgorithm, defaultAlgorithm } = theme
//
export default function RootLayout(props: any) {
    const { token } = useToken()
    const { mode } = useToggleTheme()
    return (
        <ConfigProvider theme={{ ...DefaultTheme, algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm }} >
            <App style={{ background: token.colorBgContainer }}>
                <div className={LayoutStyle.wrapper} style={{ background: token.colorBgContainer }}>
                    <TopBar />
                    <div className={LayoutStyle.contentProvider} style={{ background: token.colorBgContainer }}>
                        <Navbar />
                        <div className={LayoutStyle.content} style={{ background: token.colorBgContainer }}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </App>
        </ConfigProvider>
    )
} 