"use client";

import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { List } from "antd";
import dayjs from "dayjs";
import LoadingButton from "@components/loading-btn";
import Link from "next/link";

function RenderList(props: { item: any }) {
    const { item } = props;
    return (
        <List.Item
            key={item.id}
            title={item.number}
            actions={[
                <span key="date">{dayjs(item.date as string).format("MMMM DD, YYYY")}</span>,
                <Link href={`/administrator/procurements/${encodeURIComponent(item.id)}`} key="view-btn" passHref>
                    <LoadingButton icon={<EyeOutlined />} type="text">
                        Details
                    </LoadingButton>
                </Link>,
            ]}
        >
            <List.Item.Meta
                avatar={<ShoppingCartOutlined />}
                title={<span style={{ fontSize: "1.3em" }}>{item.number}</span>}
                description={
                    <>
                        <span style={{ fontSize: "1.1em" }}>{item.particulars}</span>
                        <br />
                        {(item.purpose as string).substring(0, 50) + "..."}
                    </>
                }
            />
        </List.Item>
    );
}

export default RenderList;
