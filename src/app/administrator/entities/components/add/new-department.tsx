import { SaveOutlined } from "@ant-design/icons";
import { addDepartment } from "@state/entities/actions";
import { Form, Input, Flex, Space, Button } from "antd";

const initData = {
    name: null,
    description: null,
};

function NewDepartment(props: { close: () => any }) {
    const [form] = Form.useForm();
    const onFinish = async () => {
        //todo
        const data = form.getFieldsValue();
        const result = await addDepartment(JSON.stringify({ ...data }));
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
