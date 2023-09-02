'use client';
import RootLayout from '@components/admin/root.layout'
import { PropsWithChildren } from 'react'

const AdminRootLayout = (props: PropsWithChildren<any>) => {
    return (
        <RootLayout>
            {props.children}
        </RootLayout>
    )
}


export default AdminRootLayout;