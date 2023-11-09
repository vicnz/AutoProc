"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { List } from "antd";
import dayjs from "dayjs";
import ViewButton from "./view-button";

function RenderList(props: { item: any }) {
    const { item } = props;
    return (
        <List.Item
            key={item.id}
            title={item.number}
            actions={[
                <span key="date">{dayjs(item.date as string).format("MMMM DD, YYYY")}</span>,
                <ViewButton id={item.id} />,
            ]}
        >
            <List.Item.Meta
                avatar={<ShoppingCartOutlined />}
                title={<span style={{ fontSize: "1.3em" }}>{item.number}</span>}
                description={
                    <>
                        <span style={{ fontSize: "1.1em" }}>{item.particulars}</span>
                        <br />
                        {item.purpose}
                    </>
                }
            />
        </List.Item>
    );
}

export default RenderList;
