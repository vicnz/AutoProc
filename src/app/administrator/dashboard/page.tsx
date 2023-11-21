import { Flex, Skeleton, Space } from "antd";
import dynamic from "next/dynamic";

//Components
//* Notifications
const NotificationCard = dynamic(async () => await import("./components/notification"), {
    ssr: false,
    loading: () => <Skeleton active />,
});
//*Graph Total Rendered
const TotalRendered = dynamic(async () => await import("./components/procurements"), {
    ssr: false,
    loading: () => <Skeleton active />,
});
//*Procured Types
const Ratio = dynamic(async () => await import("./components/ratio"), {
    ssr: false,
    loading: () => <Skeleton active />,
});
//*Overview
const Overview = dynamic(async () => await import("./components/overview"), {
    ssr: false,
    loading: () => <Skeleton active />,
});
//*Top Suppliers
const Suppliers = dynamic(async () => await import("./components/suppliers"), {
    ssr: false,
    loading: () => <Skeleton active />,
});

function Dashboard() {
    return (
        <Flex vertical gap={10} style={{ padding: "25px 0", width: "100%" }}>
            <Overview />
            <Flex gap={10} style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <Space direction="vertical">
                    <TotalRendered height={400} />
                    <Suppliers height={400} />
                </Space>
                <Space direction="vertical">
                    <NotificationCard height={300} />
                    <Ratio height={400} />
                </Space>
            </Flex>
            <br />
            <br />
        </Flex>
    );
}

export default Dashboard;
