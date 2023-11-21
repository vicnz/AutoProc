"use client";

import useSWR from "swr";
import { Error, Loading } from "../status";
import { ShopOutlined } from "@ant-design/icons";
import { Card } from "antd";
import dayjs from "dayjs";
import { BodyStyle, OverFlowStyle } from "./styles";
import RenderSuppliers from "./render-list";

function TopSuppliers(props: { height: number }) {
    const { data, isLoading, error } = useSWR("/administrator/dashboard/api/supplier");

    if (error) {
        return (
            <Error height={props.height}>
                <ShopOutlined /> Supplier (Relevance)
            </Error>
        );
    }

    if (!data || isLoading) {
        return <Loading height={props.height} />;
    }

    const { data: result } = data;
    return (
        <Card
            title={
                <>
                    <ShopOutlined /> Suppliers (Relevance)
                </>
            }
            extra={<>Current Year {dayjs().get("year")}</>}
            bodyStyle={{ ...BodyStyle, height: props.height }}
        >
            <div style={{ ...OverFlowStyle, height: props.height }}>
                <RenderSuppliers data={result} />
            </div>
        </Card>
    );
}

export default TopSuppliers;
