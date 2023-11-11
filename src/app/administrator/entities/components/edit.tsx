"use client";

import { EditOutlined, PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { App, Button, Flex, Form, Input, Modal, Select, Space } from "antd";
import { Fragment, useState } from "react";
import { updateDepartment, updateSection } from "@state/entities/actions";

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

    const onFinish = async () => {
        const formData = form.getFieldsValue();
        try {
            if (prop.type === "department") {
                //update department
                const result = await updateDepartment(JSON.stringify({ ...formData }));
            } else {
                //update section
                const result = await updateSection(JSON.stringify({ ...formData }));
            }
        } catch (err) {
            console.log(err);
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
                <Form
                    onFinish={onFinish}
                    initialValues={{ ...prop.data }}
                    layout="vertical"
                    form={form}
                    onError={(e) => console.log(e)}
                >
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="Name (Short Name)" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Flex justify="end">
                        <Space>
                            <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
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
