"use client";

import { EditOutlined, PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { App, Button, Drawer, Form, Input, Modal, Select } from "antd";
import React, { Fragment, useMemo, useState } from "react";
import { updateDepartment, updateSection } from "@state/entities/actions";

type PropType = {
    type: "section" | "department";
    add?: boolean;
    data?: {
        id?: string | null;
        name: string;
        description: string | null;
        departmentId?: string;
    };
    departments?: Array<{ label: string; value: string }>;
};

function EditDepartments(props: PropType) {
    const prop: PropType = {
        type: props.type || "department",
        add: props.add || false,
        data: props.data || {
            id: null,
            name: "",
            description: null,
            departmentId: "",
        },
        departments: props.departments,
    };
    prop.departments = props.departments && props.departments;

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [error, setError] = useState(false);
    const { message } = App.useApp();

    const onFinish = async () => {
        const error = form.getFieldsError();
        if (error.length > 0) {
            const data = form.getFieldsValue();
            if (prop.add && prop.type === "department") {
                //add new department
            }

            if (prop.add && prop.type === "section") {
                //add new section
            }

            if (!prop.add && props.type === "department") {
                //update department
                const result = await updateDepartment(JSON.stringify(data));
            }
            if (!prop.add && props.type === "section") {
                //update section
                const result = await updateSection(JSON.stringify(data));
            }
        } else {
            message.error("Check if Fields are Satisfied");
        }
    };
    return (
        <Fragment>
            {prop.add ? (
                <Button
                    icon={<PlusCircleOutlined />}
                    style={{ textTransform: "capitalize" }}
                    onClick={() => setOpen(true)}
                >
                    {prop.type}
                </Button>
            ) : (
                <Button icon={<EditOutlined />} shape="circle" onClick={() => setOpen(true)} />
            )}
            <Modal
                title={<span>{prop.type.toUpperCase()}</span>}
                open={open}
                onCancel={() => setOpen(false)}
                footer={[
                    <Button type="primary" icon={<SaveOutlined />} onClick={onFinish}>
                        Save
                    </Button>,
                ]}
            >
                <Form initialValues={prop.data} layout="vertical" form={form} onError={(e) => console.log(e)}>
                    {!prop.add && (
                        <Form.Item name="id" hidden>
                            <Input />
                        </Form.Item>
                    )}

                    <Form.Item name="name" label="Name (Short Name)" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    {prop.add && (
                        <Form.Item name="departmentId" rules={[{ required: true }]}>
                            <Select options={props.departments} />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </Fragment>
    );
}

export default EditDepartments;
