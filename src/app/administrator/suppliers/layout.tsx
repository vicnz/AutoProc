"use client";

//libs
import { CSSProperties, PropsWithChildren, memo } from "react";
//components
import Header from "./components/header";
import Content from "@components/admin/content";
import { motion } from "framer-motion";

//Content Styles
const WrapperStyles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr",
    height: "calc(100vh - 112px)",
};
//
const SupplierLayout = function (props: PropsWithChildren<any>) {
    return (
        <Content header={<Header />}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={WrapperStyles}
            >
                {props.children}
            </motion.div>
        </Content>
    );
};

export default SupplierLayout;
