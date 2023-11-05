"use client";

import { PrismaModels } from "@lib/db";
import { Divider, Flex, Form, Input, Skeleton, Switch, Avatar, Button, Tooltip, Segmented, Tag, App } from "antd";
import dynamic from "next/dynamic";
import { memo, useCallback, useState } from "react";
import { CheckCircleOutlined, SaveOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import blobToBase64, { BlobFromServer } from "@lib/client/blob-to-base64";
import { mutate } from "swr";
///
const AvatarEditor = dynamic(async () => await import("./avatar"), {
    loading: () => <Skeleton.Avatar active size={100} />,
});
const DepartmentSelector = dynamic(async () => await import("./office-selector/department"), {
    loading: () => <Skeleton.Input active />,
});
const SectionSelector = dynamic(async () => await import("./office-selector/section"), {
    loading: () => <Skeleton.Input active />,
});
//
type UserDetailsFormProps = {
    mutate?: () => void;
    close?: () => void;
    edit?: boolean; //Check if Form is for Adding New Data or for Modification
    data: Partial<PrismaModels["users"] & { fullname: string; department: string | null; section: string | null }>;
};

///
const UserDetailsForm = function (props: UserDetailsFormProps = { data: {}, edit: false }) {
    const { message } = App.useApp();
    const [form] = Form.useForm();

    const [imageData, setImageData] = useState<undefined | Blob>();
    const deptId = Form.useWatch("departmentId", form);

    const onImageEditorSave = (e: Blob) => {
        setImageData(e);
    };

    const onImageEditorCancel = () => {
        //
    };

    const onFinish = async () => {
        if (props.edit) {
            //* UPDATE USER
            let parseImage = props.data.profile
                ? ((await blobToBase64(props.data.profile as unknown as BlobFromServer)) as string)
                      .toString()
                      .split(",")[1]
                : null;
            if (imageData) {
                const base64 = (await blobToBase64(imageData)) as string;
                parseImage = base64.toString().split(",")[1];
            }
            const parsedResult: Partial<PrismaModels["users"]> = {
                ...form.getFieldsValue(),
                profile: parseImage,
            };

            const response = await fetch(`/administrator/api/user/${props.data.id}`, {
                method: "PUT",
                body: JSON.stringify(parsedResult),
            });

            if (response.ok) {
                message.info(`User Updated`);
                if (props.close) {
                    props?.close();
                }
                mutate(`/administrator/api/user?all=true&page=${0}&size=${encodeURIComponent(8)}`);
            } else {
                const resp = await response.json();
                if (resp.type === "client") {
                    message.error(`Server Error: ${resp.message}`);
                } else {
                    message.error("Server Error");
                }
            }
        } else {
            //CREATE NEW USER
            let parseImage = null;
            if (imageData) {
                const base64 = (await blobToBase64(imageData)) as string;
                parseImage = base64.toString().split(",")[1];
            }
            const parsedResult: Partial<PrismaModels["users"]> = {
                ...form.getFieldsValue(),
                profile: parseImage,
            };

            const response = await fetch(`/administrator/api/user/${parsedResult.userType}`, {
                method: "POST",
                body: JSON.stringify(parsedResult),
            });

            if (response.ok) {
                message.info(`Added New User`);
                if (props.close) {
                    props.close();
                }
                if (props.mutate) {
                    props.mutate();
                }
            } else {
                const resp = await response.json();
                if (resp.type === "client") {
                    message.error(`Server Error: ${resp.message}`);
                } else {
                    message.error("Server Error");
                }
            }
        }
    };

    return (
        <>
            <Form form={form} initialValues={props.data} layout={"vertical"} onFinish={onFinish}>
                <Flex align="center" justify="center">
                    <AvatarEditor
                        src={props.data.profile as unknown as Blob}
                        onSave={onImageEditorSave}
                        onCancel={onImageEditorCancel}
                    />
                </Flex>
                <Divider>PERSONAL INFORMATION</Divider>
                <Form.Item name="fname" label="First Name" rules={[{ required: true, message: "Required First Name" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="mname" label="Middle Name">
                    <Input />
                </Form.Item>
                <Form.Item name="lname" label="Last Name" rules={[{ required: true, message: "Required Last Name" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="suffix" label="Suffix">
                    <Input />
                </Form.Item>
                <Divider>Office</Divider>
                <Form.Item
                    name="departmentId"
                    label="Department"
                    rules={[{ required: true, message: "Required Department" }]}
                >
                    <DepartmentSelector />
                </Form.Item>
                <Form.Item name="sectionId" label="Section">
                    <SectionSelector deptId={deptId} form={form} />
                </Form.Item>
                <Divider>Contact</Divider>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Required Email" }]}>
                    <Input inputMode="email" />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                    <Input inputMode="tel" />
                </Form.Item>
                <Form.Item name="link" label="Link" tooltip="Social Links, ex. FB Messenger Account">
                    <Input inputMode="url" />
                </Form.Item>
                <Divider />
                <Button htmlType="submit" type="primary" icon={<SaveOutlined />} block size="large">
                    Save Changes
                </Button>
            </Form>
        </>
    );
};

export default memo(UserDetailsForm);
