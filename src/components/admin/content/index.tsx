'use client';

//libs
import { CSSProperties, ReactNode, memo } from 'react';
import { theme } from 'antd';
//components
//configs
const { useToken } = theme
//

const WrapperStyles: CSSProperties = {
    height: "calc(100vh - 56px)",
    width: "calc(100vw - 56px)",
    borderRadius: "8px 0 0 0",
    display: "grid",
    gridTemplateRows: "56px 1fr",
};

const BodyStyles: CSSProperties = {
    height: "calc(100vh - 112px)",
    width: "100%",
    position: "relative",
    overflowY: "auto",
};

const BodyScrollStyles: CSSProperties = {
    height: "auto",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
};

const ContentWrapper = function (props: { children: ReactNode, header?: ReactNode }) {
    const { token } = useToken()
    return (
        <div style={{ ...WrapperStyles, backgroundColor: token.colorBgLayout }}>
            <div data-name='header'>
                {props.header}
            </div>
            <div data-name="body" style={BodyStyles}>
                <div data-name='body-scroll' style={BodyScrollStyles}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default memo(ContentWrapper);