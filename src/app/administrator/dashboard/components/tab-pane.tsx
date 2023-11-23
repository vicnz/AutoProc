"use client";

import { PropsWithChildren, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { Chart as ChartJs, registerables } from "chart.js";
//
const TabPaneWrapper = function (props: PropsWithChildren<any>) {
    ///Preload All Components
    useEffect(() => {
        ChartJs.register(...registerables);
    }, []);

    return (
        <motion.div
            layout
            initial="hidden"
            whileInView="visible"
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
            }}
            style={{ height: "calc(100vh - 112px)", width: "100%", position: "relative", overflowY: "auto" }}
        >
            <div
                style={{
                    height: "auto",
                    width: "inherit",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    paddingRight: "20px",
                }}
            >
                {props.children}
            </div>
        </motion.div>
    );
};

export default memo(TabPaneWrapper);
