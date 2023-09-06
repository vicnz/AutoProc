import { Space, Descriptions, Table, Typography, DatePicker } from 'antd';
import { forwardRef, useState } from 'react'
import Image from 'next/image'
import AMBISYON from '@media/templates/ambisyon.png'
import BSCBANNER from '@media/templates/bsclogo.png'

const dataSource = [
    {
        key: '1',
        qty: 45,
        type: 'pcs',
        item: 'Sesame Seeds',
        stock: null,
        unit: 145.00,
        total: 3_345.78
    },
    {
        key: '2',
        qty: 34,
        type: 'pcs',
        item: 'Machine Gun Kelly',
        stock: '232-434-AB',
        unit: 145.00,
        total: 3_345.78
    },
];

const columns = [
    {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
    },
    {
        title: 'Unit of Issue',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Item Description',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: 'Stock No.',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
        title: "Estimated",
        children: [
            {
                title: 'Unit Cost',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: 'Total Cost',
                dataIndex: 'total',
                key: 'total',
            },
        ]
    }
];

const { Text } = Typography
// eslint-disable-next-line react/display-name
export const PrintableComponent = forwardRef((props: any, ref) => {
    const { data } = props;
    return (
        //@ts-ignore
        <div ref={ref} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <div data-printable="true" style={{ height: '800px', maxWidth: '669px', padding: '0px 15px', paddingTop: '15px' }}>
                <Space direction="vertical" style={{ height: 'inherit', display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gridTemplateColumns: '1fr' }}>
                    <div style={{ height: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Image alt="ambisyon" src={BSCBANNER} width={300} height={75} />
                        <Image alt="ambisyon" src={AMBISYON} width={150} height={75} />
                    </div>
                    <Descriptions bordered size="small">
                        <Descriptions.Item label="PR No.">2023-09-87894</Descriptions.Item>
                        <Descriptions.Item label="Date" span={2}>2023/09/03</Descriptions.Item>
                        <Descriptions.Item label="End User" span={3}>Jarvis Fleck</Descriptions.Item>
                        <Descriptions.Item label="Department">Bids & Awards Office</Descriptions.Item>
                        <Descriptions.Item label="SAI No." span={2}>679879</Descriptions.Item>
                        <Descriptions.Item label="Section">Procurement Management</Descriptions.Item>
                        <Descriptions.Item label="OBR No.">9048509</Descriptions.Item>
                    </Descriptions>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        size="small"
                        pagination={false}
                        bordered
                        summary={
                            () => (
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={3}></Table.Summary.Cell>
                                        <Table.Summary.Cell index={4}>Total</Table.Summary.Cell>
                                        <Table.Summary.Cell index={5}>78,456.89</Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            )
                        }
                    />
                    <Descriptions bordered size="small" layout='vertical'>
                        <Descriptions.Item label="Purpose" span={3}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae libero placeat assumenda impedit hic qui repellat nulla laudantium quis incidunt, similique sunt quibusdam eos sequi.
                        </Descriptions.Item>
                        <Descriptions.Item label="End User">
                            <div style={{ padding: '15px 0', textAlign: 'center' }}>
                                <br />
                                <Text strong style={{ textTransform: 'uppercase' }}>{`Designated end-user`}</Text>
                                <br />
                                <Text style={{ textTransform: 'capitalize' }} italic>{`designate office`}</Text>
                                <br />
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Approved">
                            <ApprovalSignatureBlock />
                        </Descriptions.Item>
                    </Descriptions>
                </Space>
            </div>
        </div>
    )
})

export default PrintableComponent;

const ApprovalSignatureBlock = () => {
    const [update, setUpdate] = useState({ name: 'djovi regala durante', office: 'college president' })
    return (
        <div style={{ padding: '15px 0', textAlign: 'center' }}>
            <br />
            <Text editable strong style={{ textTransform: 'uppercase' }}>DJOVI REGALA DURANTE</Text>
            <br />
            <Text editable style={{ textTransform: 'capitalize' }} italic onChange={(e) => console.log(e)}>College President</Text>
            <br />
        </div>
    )
}