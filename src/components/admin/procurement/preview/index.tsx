"use client";
//libs
import { theme } from "antd";
import {
    CSSProperties,
    ForwardedRef,
    PropsWithChildren,
    forwardRef,
    memo,
} from "react";
//components
import ConfigProvider from '@components/admin/procurement/LocalThemeConfig'
//Styles
const WrapperStyles: CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
    overflowY: "auto",
    backgroundSize: "2em 2em",
};

const ScrollStyle: CSSProperties = {
    position: "absolute",
    height: "auto",
    top: 0,
    left: 0,
    padding: "25px 0",
    display: "grid",
    placeItems: "center",
    width: "inherit",
};

const PreviewPaneStyle: CSSProperties = {
    display: "grid",
    placeItems: "center",
};

const PrintablePaneStyle: CSSProperties = {
    minWidth: "inherit",
    backgroundColor: "white",
    borderRadius: 8,
    color: "darkslategray",
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
    padding: "15px 0",
};
//compoents
const Preview = forwardRef(
    function PreviewWrapper
        (props: PropsWithChildren<{ width?: number }>, ref: ForwardedRef<any>) {
        const { token } = theme.useToken();
        const sharedColor = "#B1B5B3";
        return (
            <ConfigProvider>
                <div
                    style={{
                        ...WrapperStyles,
                        backgroundImage: `radial-gradient(circle, transparent 25%, ${token.colorBgLayout}  26%),linear-gradient(45deg, transparent 46%, ${sharedColor}90 47%, ${sharedColor}90 52%, transparent 53%), linear-gradient(135deg, transparent 46%, ${sharedColor}90 47%, ${sharedColor}90 52%, transparent 53%)`,
                    }}
                >
                    <div style={ScrollStyle}>
                        <div style={{ ...PreviewPaneStyle, width: props.width || 775 }}>
                            <div ref={ref} style={PrintablePaneStyle}>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        );
    }
);

export default memo(Preview);
