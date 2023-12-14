"use client";

import { ContainerOutlined, DollarOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Result, Skeleton, Space, Spin, Statistic } from "antd";
import useSWR from "swr";
import PesoIcon from "@media/Peso";

type ResponseType = {
    users: {
        count: number;
        year: number;
    };
    procurements: {
        count: number;
        year: number;
    };
    suppliers: {
        count: number;
        year: number;
    };
    totalCosts: {
        count: number;
        year: number;
    };
};

//
function Overview() {
    const { data, error, isLoading } = useSWR<ResponseType>("/administrator/dashboard/api/overview");

    if (error) {
        return (
            <Space wrap>
                <Card>
                    <Result title="Failed To Fetch Data..." status="error" />
                </Card>
            </Space>
        );
    }

    if (!data || isLoading) {
        return (
            <Space wrap>
                {new Array(4).fill(0).map((item, idx) => {
                    return (
                        <Card key={idx} style={{ display: "grid", placeItems: "center", width: 168, height: 112 }}>
                            <Spin spinning />
                        </Card>
                    );
                })}
            </Space>
        );
    }

    const { procurements, suppliers, users, totalCosts } = data;
    //TODO format total result to SHORT using Intl
    return (
        <Space wrap>
            <Card>
                <Statistic
                    title={`Total PRs (${procurements.year})`}
                    value={Intl.NumberFormat("en", { notation: "compact" }).format(procurements.count)}
                    prefix={<ContainerOutlined />}
                />
            </Card>
            <Card>
                <Statistic
                    title={`Total Cost (${totalCosts.year})`}
                    value={Intl.NumberFormat("en", { notation: "compact" }).format(totalCosts.count)}
                    prefix={<PesoIcon style={{ fontSize: "32px" }} />}
                />
            </Card>
            <Card>
                <Statistic
                    title={`Total Users (${users.year})`}
                    value={Intl.NumberFormat("en", { notation: "compact" }).format(users.count)}
                    prefix={<UserOutlined />}
                />
            </Card>
            <Card>
                <Statistic
                    title={`Total Suppliers (${suppliers.year})`}
                    value={Intl.NumberFormat("en", { notation: "compact" }).format(suppliers.count)}
                    prefix={<ShopOutlined />}
                />
            </Card>
        </Space>
    );
}

export default Overview;
