"use client";

import { SaveOutlined } from "@ant-design/icons";
import { Form, Flex, Divider, Input, Button, Radio, App } from "antd";
import { updateNewUser } from "@state/users/actions";

import DepartmentSelector from "./office-selector";
import AvatarUploader from "./avatar";
import { useMemo, useState } from "react";

interface Option {
    value: string;
    label: string | null;
    children?: Option[];
}

type FormDrawerProps = {
    data: Option[];
    userData: any;
};

function FormDrawer(props: FormDrawerProps) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<undefined | Blob>();
    const { message } = App.useApp();
    const onImageUpload = async (e?: any) => {
        setSelectedImage(e);
    };
    //server action

    const onSubmit = async () => {
        setLoading(true);
        //
        const formData = new FormData();
        const values = form.getFieldsValue();
        Object.keys(values).forEach((key) => formData.append(key, values[key] || ""));

        console.log(typeof selectedImage !== "undefined" && selectedImage !== null);
        formData.append("profile", (selectedImage as any) || "");

        const result = await updateNewUser(formData);

        if (result?.error) {
            setLoading(false);
            message.error("Failed To Save User, Please Try Again");
        } else {
            setLoading(false);
            message.success("Save New User");
        }
    };

    const userData = useMemo(() => {
        const _userData = props.userData;
        const office = [_userData?.departmentId];
        if (_userData?.sectionId) office.push(_userData?.sectionId);
        return {
            ..._userData,
            office,
        };
    }, [props.userData]);

    ///
    return (
        <>
            <Form
                form={form}
                initialValues={{
                    ...userData,
                }}
                layout={"vertical"}
                onFinish={onSubmit}
            >
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Flex align="center" justify="center">
                    <Form.Item>
                        <AvatarUploader onSave={onImageUpload} initData={props.userData?.profile} />
                    </Form.Item>
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
                {/* PARSE FIELD OFFICE IN FORM EDIT */}
                <Form.Item label="Office" name={`office`} rules={[{ required: true, message: "Required Department" }]}>
                    <DepartmentSelector data={props.data} />
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
                <Button htmlType="submit" type="primary" icon={<SaveOutlined />} block size="large" loading={loading}>
                    Save Changes
                </Button>
            </Form>
        </>
    );
}

export default FormDrawer;
