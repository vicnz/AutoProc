"use client";

import { Descriptions, Table } from "antd";
import { useMemo } from "react";

import columns from "./columns";
import renderSummary from "./summary";

const RenderPurchaseOrderParticulars = function (props: { data: any }) {
    const dataWithKey = useMemo(() => {
        return (props.data.particulars as any[]).map((item, idx) => ({ ...item, key: idx + 1 }));
    }, [props.data]);

    return (
        <div style={{ padding: "0px 25px" }}>
            <Table
                size="middle"
                columns={columns as any}
                dataSource={dataWithKey as any}
                pagination={false}
                summary={renderSummary as any}
                bordered
            />
            <div style={{ height: 5 }}></div>
            <Descriptions layout="vertical" bordered size="small">
                <Descriptions.Item label="Purpose">{props.data.purpose}</Descriptions.Item>
            </Descriptions>
            <p style={{ fontSize: ".9em", textAlign: "justify" }}>
                In case of failure to make the full delivery within the time specified above, a penalty of one-tenth
                (1/10) of one percent for everyday of delay shall be imposed.
            </p>
        </div>
    );
};

export default RenderPurchaseOrderParticulars;
