"use client";

/**
 * * CONTENT WRAPPER
 * * FOR SUBSECTIONS
 */

//libs
import { PropsWithChildren, ReactNode, memo } from "react";
import { theme } from "antd";
import { motion } from "framer-motion";
import { BodyScrollStyles, BodyStyles, WrapperStyles } from "./styles";

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
