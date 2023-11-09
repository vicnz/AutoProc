"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

function AnimateAppearance(props: PropsWithChildren<{ delay?: number }>) {
    const delay = props.delay || 0;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay }}
        >
            {props.children}
        </motion.div>
    );
}

export default AnimateAppearance;
