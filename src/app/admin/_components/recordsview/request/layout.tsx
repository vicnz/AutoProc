import { DatabaseOutlined, EditOutlined } from "@ant-design/icons";
import { Divider, Segmented, SegmentedProps, Space, Switch } from "antd";
import { SegmentedLabeledOption, SegmentedValue } from "antd/es/segmented";

const items = [
    {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit',
        title: 'edit'
    },
    {
        key: 'preview',
        icon: <DatabaseOutlined />,
        label: 'Preview',
        title: 'preview',
    }
]

const PurchaseRequest = function () {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', paddingRight: '25px' }}>
                {/* <Segmented options={items as any} defaultValue={'preview'} size='large' /> */}
                <span>Purchase Request</span>
                <Space>
                    <span>Preview</span>
                    <Switch title="Checked"></Switch>
                </Space>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolore, earum alias dolorum aspernatur explicabo reprehenderit excepturi, quidem modi qui tempore adipisci voluptate nisi cum minus asperiores hic. Architecto, quasi?
            </p>
        </>
    )
}

export default PurchaseRequest;