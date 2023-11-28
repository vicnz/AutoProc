import { SaveOutlined } from "@ant-design/icons";
import { Form, Input, Flex, Space, Button, Select, Divider, App } from "antd";
import { useMemo, useState } from "react";
import { objectToForm } from "@lib/converters/formData";
import { addSection } from "./actions";

const initData = {
    name: null,
    description: null,
};

function NewDepartment(props: { close: () => any; departmentList: Array<{ id: string; description: string }> }) {
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);

    const onFinish = async () => {
        setLoading(true);
        const data = objectToForm(form.getFieldsValue());
        const result = await addSection(data);
        if (result?.error) {
            setLoading(false);
            message.error(`An Error Occured ${result.message}`);
        } else {
            setLoading(false);
            message.success(`Added New Office`);
        }
    };

    const options = useMemo(() => {
        return props.departmentList.map((item) => {
            return {
                key: item.id,
                value: item.id,
                label: item.description,
            };
        });
    }, [props.departmentList]);

    return (
        <>
            <Form
                onFinish={onFinish}
                initialValues={initData}
                layout="vertical"
                form={form}
                onError={(e) => console.log(e)}
            >
                <Form.Item name="departmentId" label="Department (Parent Office)" rules={[{ required: true }]}>
                    <Select options={options} />
                </Form.Item>
                <Divider />
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
                        <Button onClick={() => props.close()}>Cancel</Button>
                    </Space>
                </Flex>
            </Form>
        </>
    );
}

export default NewDepartment;
