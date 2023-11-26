"use client";

import { ExpandOutlined } from "@ant-design/icons";
import Preview from "./steps";
import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// ─────────────────────────────────────────────────────────────────────────────
function PreviewPR(props: { data: any; number: string }) {
    const { back } = useRouter(); //router
    // ─────────────────────────────────────────────────────────────────────
    const [open, setOpen] = useState(false);
    const [expand, setExpand] = useState(false);
    // ─────────────────────────────────────────────────────────────────────
    useEffect(() => {
        setOpen(true);
    }, []);
    // ─────────────────────────────────────────────────────────────────────
    return (
        <>
            <Drawer
                destroyOnClose
                open={open}
                title={<>PR NO. {props.number}</>}
                onClose={() => {
                    setOpen(false);
                    setExpand(false);
                    back();
                }}
                placement="bottom"
                size={expand ? "large" : "default"}
                maskClosable={false}
                extra={<ExpandOutlined onClick={() => setExpand(!expand)} />}
            >
                <Preview data={props.data} />
            </Drawer>
        </>
    );
}

export default PreviewPR;
