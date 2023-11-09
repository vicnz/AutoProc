"use client";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Affix, Button, Drawer, Flex, FloatButton, Tooltip } from "antd";
import React, { PropsWithChildren, useState } from "react";
import Form from "./form";
import type { PrismaModels } from "@lib/db";

type InitialDataType = Partial<PrismaModels["suppliers"]>;

const initialValues: InitialDataType = {
    name: "",
    tin: "",
    position: "",
    address: "",
};

function AddNewSupplier(props: PropsWithChildren<any>) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Affix offsetBottom={25}>
                <Flex style={{ paddingRight: 25 }} justify="end">
                    <Button onClick={() => setOpen(true)} type="primary" icon={<PlusCircleOutlined />} size="large">
                        Add New Supplier
                    </Button>
                </Flex>
            </Affix>
            <Drawer open={open} onClose={() => setOpen(false)} title="Add New Supplier">
                <Form data={initialValues} close={() => setOpen(false)} />
            </Drawer>
        </>
    );
}

export default AddNewSupplier;
