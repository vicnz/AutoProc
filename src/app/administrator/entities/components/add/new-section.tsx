import { SaveOutlined } from "@ant-design/icons";
import { addSection } from "@state/entities/actions";
import { Form, Input, Flex, Space, Button, Select, Divider } from "antd";
import { useMemo } from "react";

const initData = {
    name: null,
    description: null,
};

function NewDepartment(props: { close: () => any; departmentList: Array<{ id: string; description: string }> }) {
    const [form] = Form.useForm();
    const onFinish = async () => {
        const data = form.getFieldsValue();
        const result = await addSection(JSON.stringify({ ...data }));
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
                <Form.Item name="name" label="Name (Short Name)" rules={[{ required: true }]} tooltip="Unique">
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
                        <Button onClick={() => props.close()}>Cancel</Button>
                    </Space>
                </Flex>
            </Form>
        </>
    );
}

export default NewDepartment;
