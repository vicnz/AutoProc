"use client";

import { Descriptions, Divider, Typography } from "antd";
import { useMemo } from "react";

const BottomSection = function (props: { particulars: any[]; reference: string }) {
    const amount = useMemo(() => {
        let totalCost = 0;
        props.particulars.forEach((item: any) => {
            totalCost += item.total;
        });

        //CONVERT TOTAL NUMBER TO CURRENCY
        const total = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
        }).format(totalCost);

        return total;
    }, [props.particulars]);

    return (
        <div style={{ padding: "0 25px" }}>
            <Descriptions colon layout="vertical" size="small" column={2} bordered>
                <Descriptions.Item label="Conforme" span={1}>
                    <div
                        style={{
                            height: 50,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography.Text
                            style={{
                                width: "100%",
                                textTransform: "uppercase",
                                textAlign: "center",
                            }}
                        >{`PRINTED NAME/SIGNATURE`}</Typography.Text>
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Very Truly Yours" span={1}>
                    <div
                        style={{
                            height: 50,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography.Text
                            style={{
                                width: "100%",
                                borderBottom: "solid lightgray 2px",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                textAlign: "center",
                            }}
                        >
                            Dr. Djovi R. Durante
                        </Typography.Text>
                        <Typography.Text style={{ width: "100%", textAlign: "center" }}>
                            College President
                        </Typography.Text>
                    </div>
                </Descriptions.Item>
            </Descriptions>
            <p>
                Date: <span style={{ display: "inline-block", width: 100, borderBottom: "1px solid black" }} />
            </p>
            <div style={{ height: 5 }}></div>
            <Descriptions bordered size="small" column={2} labelStyle={{ padding: 8 }} contentStyle={{ padding: 8 }}>
                <Descriptions.Item label="Funds Cluster" span={1}>
                    {"".padEnd(25, "\u2002")}
                </Descriptions.Item>
                <Descriptions.Item label="ORS/BURS No." span={1}>
                    {"".padEnd(25, "\u2002")}
                </Descriptions.Item>
                <Descriptions.Item label="Funds Available" span={1}>
                    <br />
                </Descriptions.Item>
                <Descriptions.Item label="Date of the OBRS" span={1}>
                    <br />
                </Descriptions.Item>
                <Descriptions.Item label="Amount" span={1}>
                    {amount}
                </Descriptions.Item>
            </Descriptions>
            <div style={{ height: 15 }}></div>
            <div style={{ textAlign: "center", display: "grid", placeItems: "center" }}>
                <div style={{ textAlign: "center", width: 400, borderBottom: "black 1px solid" }}>
                    <span
                        style={{ width: "inherit", fontSize: "1em", fontWeight: "bold", textDecoration: "uppercase" }}
                    >
                        RHEA ANGELLICA B. ADDATU,CPA
                    </span>
                </div>
                <span>Accountant I</span>
            </div>
            <div style={{ textAlign: "right" }}>REF NO: {props.reference}</div>
        </div>
    );
};

export default BottomSection;
