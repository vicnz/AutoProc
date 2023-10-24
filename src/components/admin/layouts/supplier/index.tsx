import { EyeOutlined, FrownOutlined, MehOutlined, ShopOutlined, SmileOutlined, UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Card, Progress, Rate, Skeleton, Space, Statistic } from "antd";
import dayjs from "dayjs";
import { Fragment } from "react";
import useSWR from "swr";
import { randomRange } from "@lib/random";

const Supplier = function () {
    const { data: suppliers, isLoading, error } = useSWR("/administrator/api/suppliers?_all");

    if (error) {
        return <></>;
    }

    if (isLoading || !suppliers) {
        return <Skeleton active />;
    }
    console.log(suppliers);
    return (
        <>
            <Space direction="vertical" style={{ width: "100%" }}>
                <div />
                <Space>
                    <Card>
                        <Statistic title={`Active Suppliers`} value={45} prefix={<UserAddOutlined />} />
                    </Card>
                    <Card>
                        <Statistic
                            title={`Inactive Suppliers`}
                            value={10}
                            prefix={<UserDeleteOutlined />}
                            valueStyle={{ color: "red" }}
                        />
                    </Card>
                </Space>
                <div />
                <div style={{ fontSize: "1.5em" }}>Top 5 Suppliers</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 25 }}>
                    {(suppliers as any[]).map((item, idx) => {
                        return (
                            <Fragment key={item.id}>
                                <SupplierItem {...item} idx={idx} />
                            </Fragment>
                        );
                    })}
                </div>
                <div></div>
            </Space>
        </>
    );
};

const SupplierItem = function (props: any) {
    return (
        <Card
            title={
                <span>
                    <ShopOutlined /> {props.tin}
                </span>
            }
            extra={<Rate value={randomRange(1, 5)} count={5} />}
            cover={
                <div style={{ display: "grid", placeItems: "center", padding: 25 }}>
                    <Progress percent={randomRange(25, 100)} type='line' size="small" />
                    <Progress percent={randomRange(25, 100)} type='line' size="small" />
                </div>
            }
        >
            <Card.Meta title={props.name} description={props.address} />
        </Card>
    );
};

export default Supplier;
