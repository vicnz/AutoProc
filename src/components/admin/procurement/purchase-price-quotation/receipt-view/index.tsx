"use client";

import { Table, Descriptions, List } from "antd";
import PreviewHeader from "@components/admin/layouts/procurement-item/preview-wrapper/header";
import NumToWords from "@lib/client/num-to-words";
const AcknowledgementReceipt = function (props: { data: any }) {
    return (
        <>
            <PreviewHeader height={150}>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <div style={{ fontSize: "1.2em", fontWeight: "bold", width: 700, textAlign: "center" }}>
                        <br />
                        AKNOWLEDGEMENT OF PRICE OF QUOTATION
                    </div>
                </div>
            </PreviewHeader>
            <div style={{ padding: "5px 25px" }}>
                <Table
                    size="small"
                    columns={[
                        { key: "id", dataIndex: "key", title: "No." },
                        { key: "id", dataIndex: "name", title: "Supplier" },
                        { key: "x", dataIndex: "", title: "Received By" },
                        { key: "x", dataIndex: "", title: "Date & Time" },
                    ]}
                    dataSource={(props.data?.suppliers as any[]).map((item, idx) => ({ ...item, key: idx + 1 }))}
                    bordered
                    pagination={false}
                    summary={renderExtraReceipt as any}
                />
                <br />
                <Descriptions bordered size="small" layout="vertical">
                    <Descriptions.Item label="Note">
                        <List size="small">
                            <List.Item key={1} style={{ fontSize: ".8em" }}>
                                1. MODE OF PRICE EVALUATION SHALL BE ON A LOT BASIS, OTHERWISE PER ITEMS EVALUATION
                                SHALL BE USED IF THERE WILL BE LACKING ITEMS IN ALL RFQ&apos;S AND THE END-USER AGREED,
                                . (Clause 15.2, Section II, Instructions to Bidders of the Philippine Bidding Documents
                                for goods and infrastructure projects){" "}
                            </List.Item>
                            <List.Item key={2} style={{ fontSize: ".8em" }}>
                                2. DELIVERY PERIOD: December 28-29, 2022.
                            </List.Item>
                            <List.Item key={3} style={{ fontSize: ".8em" }}>
                                3. WARRANTY SHALL BE FOR A PERIOD OF SIX (6) MONTHS FOR SUPPLIES AND MATERIALS, ONE (1)
                                YEAR FOR EQUIPMENT, FROM THE DATE OF ACCEPTANCE BY THE PROCURING ENTITY.
                            </List.Item>
                            <List.Item key={4} style={{ fontSize: ".8em" }}>
                                4. THE APPROVED BUDGET CEILING FOR THIS PROCUREMENT IS{" "}
                                {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "PHP",
                                }).format(props?.data?.total)}{" "}
                                ({NumToWords(props?.data?.total).toUpperCase()} PESOS) (GPPB Resolution no. 09-2009)
                            </List.Item>
                            <List.Item key={5} style={{ fontSize: ".8em" }}>
                                5. PRICE VALIDITY SHALL BE OR THE PERIOD OF 30 CALENDAR DAYS.
                            </List.Item>
                            <List.Item key={6} style={{ fontSize: ".8em" }}>
                                6. BIDDERS SHALL SUBMIT ORIGINAL BROCHURES SHOWING SPECIFICATIONS OF THE PRODUCT BEING
                                OFFERED IF APPLICABLE.
                            </List.Item>
                        </List>
                    </Descriptions.Item>
                </Descriptions>
                <p style={{ textAlign: "center", fontSize: "1.2em", fontWeight: "bold" }}>
                    RETRIEVAL OF REQUEST FOR QUOTATION
                </p>
                <Table
                    size="small"
                    columns={[
                        { key: "id", dataIndex: "key", title: "No." },
                        { key: "id", dataIndex: "name", title: "Supplier" },
                        { key: "x", dataIndex: "", title: "Released By" },
                        { key: "x", dataIndex: "", title: "Date & Time" },
                    ]}
                    dataSource={(props.data?.suppliers as any[]).map((item, idx) => ({ ...item, key: idx + 1 }))}
                    bordered
                    pagination={false}
                    summary={renderExtraReceipt as any}
                />
                <br />
            </div>
        </>
    );
};

const renderExtraReceipt = (pageData: any[]) => {
    let count = pageData.length;
    return (
        <>
            {new Array(10 - count).fill(0).map((item, idxRow) => {
                return (
                    <Table.Summary.Row key={idxRow + "-row"}>
                        {new Array(4).fill(0).map((item, idx) => {
                            const rowIdentified = idxRow - 1;
                            if (idx === 0) {
                                return (
                                    <Table.Summary.Cell index={idx} key={idx + "-cell-spacer"}>
                                        {count + (idxRow + 1)}
                                    </Table.Summary.Cell>
                                );
                            } else {
                                return <Table.Summary.Cell index={idx} key={idx + "-cell-spacer"}></Table.Summary.Cell>;
                            }
                        })}
                    </Table.Summary.Row>
                );
            })}
        </>
    );
};

export default AcknowledgementReceipt;
