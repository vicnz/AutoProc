import { ShoppingCartOutlined, DesktopOutlined, WarningOutlined } from "@ant-design/icons";
import { Empty, List, Card, Avatar } from "antd";
import dayjs from "dayjs";
import styles from './items.module.css'
const RenderNotificationsItem = (props: { data: Array<any> }) => {
    if (props.data.length < 1) {
        return <Empty description="No New Notifications For Today" />;
    }
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.data}
            renderItem={(item: any) => {
                return (
                    <List.Item key={item.id}>
                        <Card style={{ width: "100%" }} className={styles.card}>
                            <Card.Meta
                                avatar={
                                    <Avatar
                                        style={{ background: '#C0252A60' }}
                                        icon={
                                            <>
                                                {
                                                    {
                                                        delivery: <ShoppingCartOutlined />,
                                                        system: <DesktopOutlined />,
                                                        critical: <WarningOutlined />,
                                                    }[item.type as string]
                                                }
                                            </>
                                        }
                                    />
                                }
                                title={
                                    <>
                                        <span>{item.title}</span>
                                        {" | "}
                                        <span>{dayjs(item.createdAt as string).format("hh:mm A")}</span>
                                    </>
                                }
                                description={
                                    <>
                                        <span>{(item.description as string).substring(0, 100)}</span>
                                    </>
                                }
                            />
                        </Card>
                    </List.Item>
                );
            }}
        />
    );
};

export default RenderNotificationsItem;
