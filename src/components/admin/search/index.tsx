"use client";

//libs
import { useState, useEffect, memo } from "react";
import { Input, Modal, Tooltip, theme } from "antd";
import { MacCommandOutlined } from "@ant-design/icons";
//components
import SearchModal from "@components/admin/search/modal";

//SHORTCUT Tooltip
const ShortCutTooltip = (
    <Tooltip title="Command Or Control + /" placement="bottom">
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <MacCommandOutlined />
            <span style={{ scale: 0.8 }}>+</span>
            <span>/</span>
        </div>
    </Tooltip>
);
//
const SearchBar = function () {
    const [open, setOpen] = useState<boolean>(false);

    //Show Modal on KEY PRESS [CTRL + /]
    const onKeyPress = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "/") {
            setOpen(true);
        }
    };

    //Component Effect
    useEffect(() => {
        window.addEventListener("keydown", onKeyPress);
        return () => window.removeEventListener("keydown", onKeyPress);
    }, []);

    return (
        <div style={{ width: "25%" }}>
            <Input
                placeholder="Search Purchase Requests, Purchase Order, Users and etc."
                onClick={() => setOpen(true)}
                readOnly
                addonAfter={ShortCutTooltip}
            />
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                style={{ top: "10px" }}
                closeIcon={null}
                destroyOnClose
            >
                <SearchModal closeModal={setOpen as (value: boolean) => {}} />
            </Modal>
        </div>
    );
};

export default memo(SearchBar);
