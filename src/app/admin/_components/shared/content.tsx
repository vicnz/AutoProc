'use client';

import { PropsWithChildren, ReactNode } from 'react';
import { theme } from 'antd'
import Styles from './content.module.css'

const { useToken } = theme
export const ContentWrapper = (props: PropsWithChildren<any>) => {
    const token = useToken()
    return (
        <div className={Styles.wrapper} style={{ backgroundColor: token.token.colorBgLayout }}>
            <div className={Styles.content}>
                <div className={Styles.content_scroll}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export const ContentWrapperHasHeader = (props: PropsWithChildren<{ header?: ReactNode }>) => {
    const token = useToken()
    return (
        <div className={Styles.wrapper} style={{ backgroundColor: token.token.colorBgLayout }}>
            <div className={Styles.content}>
                <div className={Styles.header_wrapper}>
                    {props.header}
                </div>
                <div className={Styles.content_wrapper}>
                    <div className={Styles.content_wrapper_scroll}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div >
    )
}
