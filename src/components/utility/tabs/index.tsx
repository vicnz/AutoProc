import { CheckOutlined, CheckSquareOutlined, ScanOutlined } from "@ant-design/icons";
import { Result, Skeleton, TabPaneProps, TabsProps } from "antd";
import Pane from "./pane";
import dynamic from "next/dynamic";

const Tracking = dynamic(async () => await import('@components/utility/tracking'), { loading: () => <Skeleton active /> })
const tabs: TabsProps['items'] = [
    {
        label: <span><ScanOutlined /> Tracking</span>,
        key: 'tracking',
        children: (
            <Pane>
                <Tracking />
            </Pane>
        )
    },
    {
        label: <span><CheckOutlined /> Checker</span>,
        key: 'checker',
        children: (
            <Pane>
                <Result status={"info"} title="Still in Development" subTitle="CHECKER feature is primarily used for approving and validating deliveries to assure that the procurement item's Terms are met and completed" style={{ padding: '0px 0px 0px 24px' }} />
            </Pane>
        )
    },
]

export default tabs;