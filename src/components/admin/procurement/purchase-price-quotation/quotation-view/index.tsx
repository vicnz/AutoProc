"use client";

import { Descriptions, List, Table, Typography } from "antd";
import dayjs from "dayjs";
import { memo, useState } from "react";
//components
import NumToWords from "@lib/numToWords";
import PreviewHeader from "@components/admin/procurement/previewheader";
//local
import Columns from "./columns";
import RenderSummary from './renderSummary'
const { Text } = Typography;

const PriceQuotationPreview = function (props: { data: any; supplier: any }) {
    const [approval, setApproval] = useState("Dr. Djovi Regala Durante");
    const [office, setOffice] = useState("College President");
    return (
        <>
            {/* PREVIEW HEADER */}
            <PreviewHeader height={150}>
                <div
                    style={{ display: "flex", justifyContent: "center", width: "100%" }}
                >
                    <div
                        style={{
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            width: 700,
                            textAlign: "center",
                        }}
                    >
                        <br />
                        REQUEST FOR PRICE QUOTATION
                    </div>
                </div>
            </PreviewHeader>
            <Descriptions
                style={{ padding: "5px 25px" }}
                bordered
                layout="vertical"
                size="small"
                column={5}
            >
                <Descriptions.Item
                    label="Supplier"
                    span={4}
                    style={{ fontWeight: "bold", whiteSpace: "normal" }}
                >
                    {props.supplier?.padEnd(50, "\u2002")}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Date"
                    span={1}
                    contentStyle={{ maxWidth: 200 }}
                >
                    {dayjs(props?.data.date).format("MM/DD/YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Note" span={5}>
                    <List size="small">
                        <List.Item key={0} style={{ fontSize: ".9em" }}>
                            Please give us your best and final price offer for the item/s
                            listed below, have this signed and submit this by you or by your
                            duly authorized representative WITHIN SEVEN (7) CALENDAR DAYS upon
                            receipt to Procurement Section, Batanes State College.
                        </List.Item>
                        <List.Item key={1} style={{ fontSize: ".8em" }}>
                            1. THE DEFAULT MODE OF PRICE EVALUATION SHALL BE ON A LOT BASIS,
                            OTHERWISE PER ITEMS EVALUATION SHALL BE USED IF THERE WILL BE
                            LACKING ITEMS IN ALL RFQ&apos;s AND SUBJECT TO END-USER APPROVAL.,
                            (Clause 15.2, Section I, Instruction to Bidders of the Philippine
                            Bidding Documents for goods and infrastructure projects)
                        </List.Item>
                        <List.Item key={2} style={{ fontSize: ".8em" }}>
                            2. DELIVERY PERIOD: &lt;30, 60, OR 90 calendar days&gt;
                        </List.Item>
                        <List.Item key={3} style={{ fontSize: ".8em" }}>
                            3. Submission of price quotation shall be in sealed envelope.
                        </List.Item>
                        <List.Item key={4} style={{ fontSize: ".8em" }}>
                            4. THE APPROVED BUDGET FOR THIS PROCUREMENT IS{" "}
                            {Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "PHP",
                            }).format(props?.data?.total)}{" "}
                            ({NumToWords(props?.data?.total).toUpperCase()} PESOS) (GPPB
                            Resolution No. 09-2009)
                        </List.Item>
                        <List.Item key={5} style={{ fontSize: ".8em" }}>
                            5. PURSUANT TO ANNEX &lsquo;H&rsquo;, APPENDIX A, SECTION II,
                            SUBMISSION OF APPLICABLE DOCUMENTS (e.g.MAYORS/BUSINESS PERMIT,
                            PROFESSIONAL LICENSE/CURRICULUM VITAE (CONSULTING
                            SEERVICES),PHILGEPS CERT. NO., PCAB LICENSE (INFRA),
                            INCOME/BUSINESS TAX RETURN,OMNIBUS SWORN STATEMENT SHALL BE
                            REQUIRED BEFORE THE ISSUANCE OF NOA OR PRIOR TO PAYMENT.
                        </List.Item>
                        <List.Item key={6} style={{ fontSize: ".8em" }}>
                            6. In case the item is not availble, please write
                            &lsquo;None&rsquo;.
                        </List.Item>
                    </List>
                </Descriptions.Item>
            </Descriptions>
            {/* PARTICULARS VIEW */}
            <Table
                bordered
                columns={Columns as any}
                dataSource={props.data?.particulars}
                style={{ padding: "5px 25px" }}
                pagination={false}
                summary={RenderSummary as any}
            />
            {/* PARTICULARS VIEW */}
            <div style={{ padding: "5px 25px" }}>
                <p style={{ fontSize: ".9em" }}>
                    After having carefully read and accepted your conditions, I/We have
                    place my /our best and final price offer on the item/s listed above.
                </p>
                <Descriptions layout="vertical" column={2} bordered size="small">
                    <Descriptions.Item label="Representative" span={1}>
                        <div
                            style={{
                                height: 100,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    width: "100%",
                                    textTransform: "uppercase",
                                    textAlign: "center",
                                }}
                            >{`PRINTED NAME/SIGNATURE`}</Text>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Approval" span={1}>
                        <div
                            style={{
                                height: 100,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    width: "100%",
                                    borderBottom: "solid lightgray 2px",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    textAlign: "center",
                                }}
                                editable={{
                                    text: approval,
                                    triggerType: ["text"],
                                    onChange(value) {
                                        setApproval(value);
                                    },
                                }}
                            >
                                {approval}
                            </Text>
                            <Text
                                style={{ width: "100%", textAlign: "center" }}
                                editable={{
                                    text: office,
                                    triggerType: ["text"],
                                    onChange(value) {
                                        setOffice(value);
                                    },
                                }}
                            >
                                {office}
                            </Text>
                        </div>
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                    <Descriptions.Item label="Reference No:">
                        {props?.data?.reference}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export default memo(PriceQuotationPreview);
