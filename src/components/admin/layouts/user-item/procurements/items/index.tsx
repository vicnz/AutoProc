import { ShoppingOutlined } from "@ant-design/icons";
import { PrismaModels } from "@lib/db";
import { Avatar, List, Typography, theme } from "antd";
import dayjs from "dayjs";
import { Fragment, memo } from "react";
import ViewPRInfo from "./view";

interface ItemProps {
    data: Pick<PrismaModels["purchase_requests"], "date" | "number" | "purpose" | "id" | "reference" | "particulars">;
}
function ListItem(props: ItemProps) {
    const { token } = theme.useToken();
    const dateOfIssue = dayjs(props.data.date).format("MMMM DD, YYYY");
    return (
        <List.Item
            key={props.data.id}
            actions={[
                <span key={"particulars"}>{(props.data.particulars as string) || ""}</span>,
                <Fragment key={"fragmented"}>
                    <ViewPRInfo id={props.data.id} />
                </Fragment>,
            ]}
        >
            <List.Item.Meta
                title={<span>PR [{props.data.number}]</span>}
                description={
                    <>
                        <div>Date @ {dateOfIssue}</div>
                        <Typography.Text ellipsis>{props.data.purpose}</Typography.Text>
                    </>
                }
                avatar={<Avatar icon={<ShoppingOutlined />} size={38} style={{ background: token.colorPrimary }} />}
            />
        </List.Item>
    );
}

export default memo(ListItem);
