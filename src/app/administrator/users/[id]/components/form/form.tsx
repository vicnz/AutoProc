"use client";

import { App, Badge, Button, Card, CascaderProps, Divider, Flex, Form, Input, Radio, RadioChangeEvent, Switch, Tooltip } from "antd";
import { useMemo, useState } from "react";
import OfficeSelector from "@components/office-selector";
import { LockOutlined } from "@ant-design/icons";
import AvatarEditor from "@components/avatar-editor";
import { PrismaModels } from "@lib/db";
import { updateUser } from "./actions";
import { srcToFile } from "@lib/converters/urlToFile";

type AddUserFormProps = {
    offices: CascaderProps["options"];
    preloadData: Partial<PrismaModels["users"]>;
};

function EditUserForm(props: AddUserFormProps) {
    const { message, modal } = App.useApp();
    const [form] = Form.useForm();
    const [passwordEdit, setPasswordEdit] = useState(false);
    const [fileObj, setFileObj] = useState(
        props.preloadData.profile &&
        srcToFile("data:image/png;base64," + props.preloadData.profile, "sample-img.png", "image/png")
    );

    const [loading, setLoading] = useState(false);

    //Parse Preload Data
    const preload = useMemo(() => {
        const { departmentId, sectionId, profile } = props.preloadData;
        let office: string[] = [];
        if (departmentId) office = [departmentId];
        if (sectionId) office.push(sectionId);

        return {
            ...props.preloadData,
            office: office,
            profile: profile ? "data:image/png;base64," + profile : null,
            password: null,
        };
    }, [props.preloadData]);

    const onImageUpdate = async (e: any) => {
        setFileObj(e);
    };

    const onFinish = async () => {
        setLoading(true);
        const data = {
            ...form.getFieldsValue(),
            profile: await fileObj,
        };
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        formData.append("id", props.preloadData.id as string);

        // Adding New User
        const action = await updateUser(formData);
        if (action.error) {
            message.error(`Error Occured ${action?.message}`, 3);
            setLoading(false);
        } else {
            message.success(`Updated User`, 3);
            setLoading(false);
        }
    };
    return (
        <Form form={form} layout="vertical" initialValues={{ ...preload }} onFinish={onFinish}>
            <Flex align="center" justify="center">
                <div>
                    <AvatarEditor
                        onChange={onImageUpdate}
                        initValue={
                            preload.profile
                                ? { url: preload.profile as string, uid: "-something", name: "sample.png" }
                                : undefined
                        }
                    />
                </div>
            </Flex>
            <br />
            <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true }, { pattern: /^[a-zA-Z0-9_-]{5,18}$/, message: "Format Invalid" }]}
            >
                <Input />
            </Form.Item>
            <Divider />
            <Form.Item name="fname" label="First Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="mname" label="Middle Name">
                <Input />
            </Form.Item>
            <Form.Item name="lname" label="Last Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="suffix" label="Ext. Name">
                <Input />
            </Form.Item>
            <Divider>Office</Divider>
            <Form.Item name="office" label="Office Designate" rules={[{ required: true }]}>
                <OfficeSelector data={props.offices} />
            </Form.Item>
            <Divider>Contact</Divider>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input inputMode="email" />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
                <Input inputMode="tel" />
            </Form.Item>
            <Form.Item name="link" label="Social Link (Optional)">
                <Input inputMode="url" />
            </Form.Item>
            <Divider />
            <Flex gap={10} align="center">
                <Switch checked={passwordEdit} onChange={(e) => setPasswordEdit(e)} /> <span>Update Password</span>
            </Flex>
            <br />
            {passwordEdit ? (
                <>
                    <Card
                        title={
                            <>
                                <LockOutlined /> Password
                            </>
                        }
                    >
                        <p>Have at least 1 Uppercase and Lowercase Letter and One Number and A Special Character</p>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                { required: true },
                                {
                                    pattern:
                                        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_-~+])[A-Za-z\d!@#$%^&*_-~+]{8,}$/,
                                    message: "Invalid Password Format",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm-password"
                            label="Confirm Password"
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Password that you entered do not match!"));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Card>
                    <Divider />
                </>
            ) : null}
            <Button block type="primary" size="large" htmlType="submit" loading={loading}>
                Save
            </Button>
        </Form>
    );
}

export default EditUserForm;
