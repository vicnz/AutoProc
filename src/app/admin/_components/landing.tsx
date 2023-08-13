'use client';

import { theme } from 'antd'
import { ReactNode } from 'react';

const { useToken } = theme
export default function LandingLayout({ children }: { children: ReactNode }) {
    const { token } = useToken()
    return (
        <>
            <div style={{ height: '100%', width: '100%', padding: '15px', background: token.colorBgLayout }}>
                {children}
            </div>
        </>
    )
}