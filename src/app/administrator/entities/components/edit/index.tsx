"use client";

import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { App, Button, Flex, Form, Input, Modal, Space } from "antd";
import { Fragment, useState } from "react";
// import { updateDepartment, updateSection } from "@state/entities/actions";
import { objectToForm } from "@lib/converters/formData";
import { updateDepartment, updateSection } from "./actions";

type PropType = {
    type: "section" | "department";
    data?: {
        id?: string | null;
        name: string;
        description: string | null;
        departmentId?: string;
    };
};

function EditDepartments(props: PropType) {
    const prop: PropType = {
        type: props.type || "department",
        data: props.data || {
            id: null,
            name: "",
            description: null,
            departmentId: "",
        },
    };

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);

    const onFinish = async () => {
        setLoading(true);
        const data = objectToForm(form.getFieldsValue());

        if (prop.type === "department") {
            const result = await updateDepartment(data);
            if (result.error) {
                message.error(`An Error Occured ${result.message}`);
            } else {
                message.info("Updated Office");
            }
            setLoading(false);
        } else if (props.type === "section") {
            const result = await updateSection(data);
            if (result.error) {
                message.error(`An Error Occured ${result.message}`);
            } else {
                message.info("Updated Office");
            }
            setLoading(false);
        }
    };
    return (
        <Fragment>
            <Button icon={<EditOutlined />} shape="circle" onClick={() => setOpen(true)} />
            <Modal
                title={<span>{prop.type.toUpperCase()}</span>}
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                destroyOnClose
            >
                <Form onFinish={onFinish} initialValues={{ ...prop.data }} layout="vertical" form={form}>
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Office Code"
                        rules={[{ required: true }, { pattern: /^[A-Z0-9]{3,5}$/, message: "Enter Valid Office Code" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Flex justify="end">
                        <Space>
                            <Button type="primary" icon={<SaveOutlined />} htmlType="submit" loading={loading}>
                                Save
                            </Button>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                        </Space>
                    </Flex>
                </Form>
            </Modal>
        </Fragment>
    );
}

export default EditDepartments;
