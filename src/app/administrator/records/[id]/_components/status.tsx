import { StepProps, Steps, Card } from "antd";


const Items: StepProps[] = [
    {
        title: "Purchase Request",
        description: "Approved",
        status: 'finish',
    },
    {
        status: 'finish',
        title: "BAC Resolution",
        description: "Approved"
    },
    {
        status: 'finish',
        title: "Request for Quotation",
        description: "Approved"
    },
    {
        status: 'process',
        title: "Abstract of Quotation",
        description: "Nothing"
    },
    {
        title: "Notice of Award",
        description: "Pending"
    },
    {
        title: "BAC Resolution",
        description: "Pending"
    },
    {
        title: "Purchase Order",
        description: "Pending"
    },
    {
        title: "Delivery",
        description: "Pending"
    },
]

const DocumentStatus = function () {
    return (
        <Card title="Status" style={{ height: 'calc(100vh - 112px)', width: '250px', border: 'solid lightgray 1px', borderRadius: 0 }} bordered bodyStyle={{ padding: 0 }} headStyle={{ padding: '10px', height: '56px' }}>
            <div style={{ height: 'calc(100vh - 168px)', width: '100%', position: 'relative', overflowY: 'auto' }}>
                <div style={{ height: 'auto', width: '100%', position: 'absolute', top: 0, left: 0, padding: '10px' }}>
                    <Steps direction='vertical' items={Items} />
                </div>
            </div>
        </Card>
    )
}

export default DocumentStatus;