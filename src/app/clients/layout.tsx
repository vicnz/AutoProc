'use client';
import { PropsWithChildren } from 'react'

export default function ClientLayout(props: PropsWithChildren<any>) {
    return (
        <>
            {props.children}
        </>
    )
}