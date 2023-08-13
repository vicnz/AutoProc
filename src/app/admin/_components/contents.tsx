'use client';

import { theme } from 'antd';
import Style from '../_styles/contents.module.css';
import Header from './header';
import { ReactNode } from 'react';
const { useToken } = theme
export default function Content({ hasBack = null, children, actions, title, ...props }: { hasBack?: ReactNode, children: ReactNode, actions?: ReactNode, title: ReactNode | string }) {
    const { token } = useToken()
    return (
        <>
            <div className={Style.wrapper} style={{ backgroundColor: token.colorBgLayout }}>
                {/* Header Section */}
                <Header title={title} hasBack={hasBack}>
                    {actions}
                </Header>
                <div className={Style.contentOverflow}>
                    <div className={Style.content}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}