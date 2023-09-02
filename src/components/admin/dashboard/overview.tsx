
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Skeleton, Space } from "antd";
import dynamic from "next/dynamic";

const Graph = dynamic(async () => await import('./overview.graph'), { ssr: false, loading: () => <Skeleton paragraph /> })
const Summary = dynamic(async () => await import('./overview.summary'), { ssr: false, loading: () => <Skeleton paragraph /> })

const Overview = function () {
    return (
        <>
            <Space direction="vertical" style={{ width: '100%', paddingRight: '25px' }}>
                <div></div>
                <Summary />
                <Card title="Procurement Record" extra={<Button icon={<PrinterOutlined />} type='text'>Print</Button>}>
                    <Graph />
                </Card>
                <Space style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
                    <div style={{ width: '400px' }}>
                        <Card style={{ width: 'inherit' }} title="Office">
                            <Skeleton active paragraph />
                        </Card>
                    </div>
                    <div>
                        <Card style={{ width: 'inherit' }} title="Supplier">
                            <Skeleton active paragraph />
                        </Card>
                    </div>
                </Space>
                <div></div>
                <div></div>
            </Space>
        </>
    )
}


export default Overview;