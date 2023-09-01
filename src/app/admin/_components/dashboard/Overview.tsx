
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Skeleton, Space } from "antd";
import dynamic from "next/dynamic";

const Summary = dynamic(async () => await import('./Overview.Summary'), { ssr: false, loading: () => <Skeleton paragraph /> })
const Outline = dynamic(async () => await import('./Overview.Outline'), { ssr: false, loading: () => <Skeleton paragraph /> })

const Overview = function () {
    return (
        <>
            <Space direction="vertical" style={{ width: '100%', paddingRight: '25px' }}>
                <div></div>
                <Outline />
                <Card title="Procurement Record" extra={<Button icon={<PrinterOutlined />} type='text'>Print</Button>}>
                    <Summary />
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