"use client";

import { App, Button, Card, CascaderProps, Divider, Flex, Form, Input, Radio } from "antd";
import { useState } from "react";
import OfficeSelector from "@components/office-selector";
import { LockOutlined } from "@ant-design/icons";
import AvatarEditor from "@components/avatar-editor";
import { addNewUser } from "./actions";

type AddUserFormProps = {
    offices: CascaderProps["options"];
};
function AddUserForm(props: AddUserFormProps) {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [fileObj, setFileObj] = useState<any>();
    const [loading, setLoading] = useState(false);

    const onImageUpdate = async (e: any) => {
        setFileObj(e);
    };

    const onFinish = async () => {
        setLoading(true);
        const data = {
            ...form.getFieldsValue(),
            profile: fileObj,
        };
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        //Adding New User
        const action = await addNewUser(formData);
        if (action.error) {
            setLoading(false);
            message.error(`Error Occured ${action?.message}`, 3);
        } else {
            setLoading(false);
            message.success(`Added New User`, 3);
        }
    };
    return (
        <Form form={form} layout="vertical" initialValues={{ userType: "USER" }} onFinish={onFinish}>
            <Flex align="center" justify="center">
                <div>
                    <AvatarEditor onChange={onImageUpdate} />
                </div>
            </Flex>
            <br />
            <Flex align="center" justify="center">
                <Form.Item name="userType">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="USER">User</Radio.Button>
                        <Radio.Button value="TRACKER">Tracker</Radio.Button>
                        <Radio.Button value="CHECKER">Checker</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Flex>
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
                            pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_-~+])[A-Za-z\d!@#$%^&*_-~+]{8,}$/,
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
            <Button block type="primary" size="large" htmlType="submit" loading={loading}>
                Save
            </Button>
        </Form>
    );
}

export default AddUserForm;
