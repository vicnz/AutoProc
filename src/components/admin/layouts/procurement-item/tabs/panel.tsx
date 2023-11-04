"use client";

import { CSSProperties, PropsWithChildren, memo } from "react";
import { motion } from "framer-motion";
//styles
const WrapperStyle: CSSProperties = {
    height: "calc(100vh - 112px)",
    width: "100%",
    position: "relative",
    overflowY: "auto",
};
const ScrollablePane: CSSProperties = {
    height: "auto",
    width: "inherit",
    position: "absolute",
    top: 0,
    left: 0,
    paddingRight: "20px",
};
//
const TabPaneWrapper = function (props: PropsWithChildren<any>) {
    return (
        <motion.div
            style={WrapperStyle}
            layout
            initial="hidden"
            whileInView="visible"
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
            }}
        >
            <div style={ScrollablePane}>{props.children}</div>
        </motion.div>
    );
};

export default memo(TabPaneWrapper);
