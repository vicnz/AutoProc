'use client';

//libs
import { ReactNode, memo } from 'react';
import { theme } from 'antd';
//components
//configs
const { useToken } = theme
//
const ContentWrapper = function (props: { children: ReactNode, header?: ReactNode }) {
    const { token } = useToken()
    return (
        <div style={{ height: 'calc(100vh - 56px)', width: 'calc(100vw - 56px)', backgroundColor: token.colorBgLayout, borderRadius: '8px 0 0 0', display: 'grid', gridTemplateRows: '56px 1fr' }}>
            <div data-name='header'>
                {props.header}
            </div>
            <div data-name="body" style={{ height: 'calc(100vh - 112px)', width: '100%', position: 'relative', overflowY: 'auto' }}>
                <div data-name='body-scroll' style={{ height: 'auto', width: '100%', position: 'absolute', top: 0, left: 0 }}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default memo(ContentWrapper);