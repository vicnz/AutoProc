import { SaveOutlined } from "@ant-design/icons";
import { Form, Input, Flex, Space, Button, App } from "antd";
import { addDepartment } from "./actions";
import { objectToForm } from "@lib/converters/formData";
import { useState } from "react";

const initData = {
    name: null,
    description: null,
};

function NewDepartment(props: { close: () => any }) {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async () => {
        setLoading(true);
        const formData = objectToForm(form.getFieldsValue());
        const result = await addDepartment(formData);
        if (result.error) {
            setLoading(false);
            message.error(`Server Error ${result?.message}`);
        } else {
            setLoading(false);
            message.success(`Added New Office`);
        }
    };

    return (
        <>
            <Form
                onFinish={onFinish}
                initialValues={initData}
                layout="vertical"
                form={form}
                onError={(e) => console.log(e)}
            >
                <Form.Item
                    name="name"
                    label="Office Code"
                    rules={[{ required: true }, { pattern: /^[A-Z0-9]{3,5}$/, message: "Enter Valid Office Code" }]}
                    tooltip="Must Be Unique"
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
                        <Button onClick={() => props.close()}>Cancel</Button>
                    </Space>
                </Flex>
            </Form>
        </>
    );
}

export default NewDepartment;
