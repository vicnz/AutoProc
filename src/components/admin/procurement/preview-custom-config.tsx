'use client';

import { ConfigProvider, ThemeConfig } from 'antd'
import { PropsWithChildren } from 'react';

const DocumentPreviewThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#C0252A',
        colorBorder: 'darkslategray',
        colorBorderBg: 'darkgray',

    }
}
const PreviewThemeConfig = function (props: PropsWithChildren<any>) {
    return (
        <>
            <ConfigProvider theme={DocumentPreviewThemeConfig}>
                {props.children}
            </ConfigProvider>
        </>
    )
}

export default PreviewThemeConfig;