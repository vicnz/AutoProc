"use client";

import { SaveOutlined } from "@ant-design/icons";
import { App, Button, ButtonProps, Flex, Form, Input, Modal, ModalProps } from "antd";
import { ReactNode, useState } from "react";
// import { addUnit } from "@state/entities/actions";
import { addUnit } from "./action";
import { objectToForm } from "@lib/converters/formData";

type AddNewUnitProps = {
    btnProps?: ButtonProps;
    modalProps?: ModalProps;
    children?: ReactNode;
    close?: () => any;
};

function AddNewUnit(props: AddNewUnitProps) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const { btnProps, modalProps, children, ...rest } = props;

    const onFinish = async () => {
        setLoading(true);
        const data = objectToForm(form.getFieldsValue());
        const result = await addUnit(data);

        if (result?.error) {
            message.error(`An Error Occured ${result.message}`);
            setLoading(false);
        } else {
            message.success("Added A New Unit Type");
            setLoading(false);
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
                        rules={[{ required: true }, { pattern: /^[a-z]{2,3}$/, message: "Unit Code Invalid" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Flex justify="end">
                        <Button type="primary" icon={<SaveOutlined />} htmlType="submit" loading={loading}>
                            Create Unit
                        </Button>
                    </Flex>
                </Form>
            </Modal>
        </>
    );
}

export default AddNewUnit;
