"use client";

/**
 * * PREVIEW WRAPPER
 * * HOLDS THE RENDERED PAGE FOR PRINTING
 */

//libs
import { theme, ConfigProvider } from "antd";
import { ForwardedRef, PropsWithChildren, forwardRef, memo } from "react";
//components
import { DocumentPreviewThemeConfig } from "@components/admin/layouts/procurement-item/config/preview-config";
//styles
import { PreviewPaneStyle, PrintablePaneStyle, ScrollStyle, WrapperStyles } from '@components/admin/layouts/procurement-item/preview-wrapper/styles'
//compoents
const Preview = forwardRef(function PreviewWrapper(
    props: PropsWithChildren<{ width?: number }>,
    ref: ForwardedRef<any>
) {
    const { token } = theme.useToken();
    const sharedColor = "#B1B5B3";
    return (
        <ConfigProvider theme={DocumentPreviewThemeConfig}>
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
});

export default memo(Preview);
