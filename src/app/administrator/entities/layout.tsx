import { ReactNode } from "react";
import Content from "@components/admin/content";
import { Button, Card, Flex, Space } from "antd";
import {
    BlockOutlined,
    BranchesOutlined,
    EditOutlined,
    PlusCircleOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import Header from "./components/header";
import ScrollView from "./components/scroll-view";
import Animate from "./components/animate";

//default page to rendere is DEPARTMENT

type LayoutProps = {
    units: ReactNode;
    officers: ReactNode;
    children: ReactNode;
};

function Layout(props: LayoutProps) {
    return (
        <Content header={<Header />}>
            <div style={{ padding: "10px 25px" }}>
                <Flex gap={15} justify="stretch">
                    <Flex gap={15} vertical style={{ width: "50%" }}>
                        {/* TODO migrate this to it's own component */}
                        <Card
                            title={
                                <span>
                                    <BlockOutlined /> Departments
                                </span>
                            }
                            style={{ height: 600 }}
                            bodyStyle={{ padding: 0, margin: 0 }}
                            extra={
                                <Space>
                                    <Button icon={<PlusCircleOutlined />}>Department</Button>
                                    <Button icon={<PlusCircleOutlined />}>Section</Button>
                                </Space>
                            }
                        >
                            <ScrollView height={600 - 75}>{props.children}</ScrollView>
                        </Card>
                    </Flex>
                    <Flex vertical gap={15} style={{ width: "50%" }}>
                        <Card
                            title={
                                <span>
                                    <BranchesOutlined /> Units
                                </span>
                            }
                            style={{ height: 400 }}
                            bodyStyle={{ padding: 0, margin: 0, height: "100%" }}
                            extra={
                                <Space>
                                    <Button icon={<PlusCircleOutlined />}>Unit</Button>
                                </Space>
                            }
                        >
                            <ScrollView height={400 - 75}>{props.units}</ScrollView>
                        </Card>
                        <Card
                            title={
                                <span>
                                    <TeamOutlined /> BAC Organization
                                </span>
                            }
                            style={{ height: 400 }}
                            bodyStyle={{ padding: 0, margin: 0, height: "100%" }}
                        >
                            <ScrollView height={400 - 75}>{props.officers}</ScrollView>
                        </Card>
                    </Flex>
                </Flex>
            </div>
        </Content>
    );
}

export default Layout;
