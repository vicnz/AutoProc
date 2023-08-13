'use client';


import HeaderStyle from '@/app/admin/_styles/header.module.css';
import { Breadcrumb, Divider } from 'antd';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo } from 'react';

function SectionHeader({ hasBack = null, title = null, children, ...props }: { hasBack?: ReactNode, title?: string | ReactNode, children: React.ReactNode, }) {
    const pathname = usePathname()

    //!this component should not be used on the root path layout.tsx of "/admin" or "/client"
    const breadcrumb: any = useMemo(() => {
        let sliced = pathname.split('/')
        sliced.shift()
        sliced.shift()
        return sliced.map((item: string) => {
            return { title: item.toUpperCase(), key: crypto?.randomUUID() }
        })
    }, [pathname])

    return (
        <div className={HeaderStyle.container}>
            <div className={HeaderStyle.title}>
                {hasBack}
                <Breadcrumb items={breadcrumb} />
                <Divider type='vertical' />
                {title}
            </div>
            <div className={HeaderStyle.actions}>
                {children}
            </div>
        </div>
    )
}

export default SectionHeader;