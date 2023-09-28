import { QuestionCircleOutlined } from "@ant-design/icons"
import { Button, Card, Collapse, CollapseProps, Divider, Drawer, Input, Space, Steps, Tag } from "antd"
import { useState } from "react"

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
    {
        key: 1,
        label: 'Pagination',
        children: (
            <Card cover={<img src="/bg.test.png" />}>
                <Card.Meta title="Dessimation" description={text} />
            </Card>
        ),
    },
    {
        key: 2,
        label: 'Add New PR',
        children: (
            <Card cover={<img src="/bg.test.png" />}>
                <Card.Meta title="Equilibrium" description={text} />
            </Card>
        ),
    },
    {
        key: 3,
        label: 'New PR From End-User',
        children: (
            <Card cover={<img src="/bg.test.png" />}>
                <Card.Meta title="Help Accetion" description={text} />
            </Card>
        ),
    },
];

const HelpRecords = function () {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button icon={<QuestionCircleOutlined />} type='text' onClick={e => setOpen(true)} />
            <Drawer open={open} title={<span>Manual <Tag color='orange'>TODO</Tag></span>} onClose={() => setOpen(false)} bodyStyle={{ padding: '5px' }} destroyOnClose>
                <Collapse ghost items={items} defaultActiveKey={1} />
                <Divider />
                <Card style={{ border: 'none' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Input.TextArea placeholder="Feedback" allowClear rows={5} />
                        <Button block>Submit</Button>
                    </Space>
                </Card>
            </Drawer>
        </>
    )
}

export default HelpRecords;