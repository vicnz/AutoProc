"use client";

import { CardProps, Card } from "antd";
import useSWR from "swr";
import { Loading, Error } from "../status";
import RenderNotificationsItem from "./items";
import { BodyStyle, OverFlowStyle } from "./styles";
import { BellOutlined } from "@ant-design/icons";

function NotificationOutline(props: CardProps & { height: number }) {
    const { data, error, isLoading } = useSWR("/administrator/api/notification?type=today&days=1");
    const { title, height, ...rest } = props;

    if (error) {
        return <Error height={height}>{title}</Error>;
    }

    if (!data || isLoading) {
        return <Loading height={height} />;
    }

    return (
        <Card
            {...rest}
            bodyStyle={{ ...BodyStyle, height }}
            title={
                <>
                    <BellOutlined /> Notifications
                </>
            }
        >
            <div style={{ ...OverFlowStyle, height }}>
                <RenderNotificationsItem data={data.data} />
            </div>
        </Card>
    );
}

export default NotificationOutline;
