"use client";

/**
 * * CONTENT WRAPPER
 * * FOR SUBSECTIONS
 */

//libs
import { CSSProperties, PropsWithChildren, ReactNode, memo } from "react";
import { theme } from "antd";
import { motion } from "framer-motion";
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

const ContentWrapper = function (props: PropsWithChildren<{ header?: ReactNode }>) {
    const { token } = theme.useToken();
    return (
        <div style={{ ...WrapperStyles, backgroundColor: token.colorBgLayout }}>
            <motion.div
                style={{ position: "relative" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: -20 }}
                data-name="header"
            >
                {props.header}
            </motion.div>
            <div data-name="body" style={BodyStyles}>
                <motion.div
                    data-name="body-scroll"
                    style={BodyScrollStyles}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y: -20 }}
                >
                    {props.children}
                </motion.div>
            </div>
        </div>
    );
};

export default memo(ContentWrapper);
