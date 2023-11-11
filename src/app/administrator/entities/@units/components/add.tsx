"use client";

import { SaveOutlined } from "@ant-design/icons";
import db from "@lib/db";
import { Button, ButtonProps, Drawer, DrawerProps, Flex, Form, Input, Modal, ModalProps, Select } from "antd";
import { revalidatePath } from "next/cache";
import React, { ReactNode, useState } from "react";
import { addUnit } from "@state/entities/actions";

type AddNewUnitProps = {
    btnProps?: ButtonProps;
    modalProps?: ModalProps;
    children?: ReactNode;
    close?: () => any;
};

function AddNewUnit(props: AddNewUnitProps) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const { btnProps, modalProps, children, ...rest } = props;

    const onFinish = async () => {
        const formData = form.getFieldsValue();
        const result = await addUnit(JSON.stringify(formData));
        if (result?.error) {
            console.log("error Occured");
        } else {
            console.log("Add New Unit. Type..");
            setOpen(false);
        }
    };
    return (
        <>
            <Button {...btnProps} onClick={() => setOpen(true)}>
                {children || "New Unit"}
            </Button>
            <Modal
                {...modalProps}
                open={open}
                onCancel={() => setOpen(false)}
                footer={false}
                width={300}
                title="Add New Unit"
                destroyOnClose
            >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="id"
                        label="Name (Short Name)"
                        rules={[{ required: true }]}
                        tooltip="Should Be Unique"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Flex justify="end">
                        <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                            Save
                        </Button>
                    </Flex>
                </Form>
            </Modal>
        </>
    );
}

export default AddNewUnit;
