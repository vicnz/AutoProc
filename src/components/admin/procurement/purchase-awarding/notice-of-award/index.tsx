"use client";

import NumberToWords from "@lib/client/num-to-words";
import { List, Space, Typography, theme } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
const { Text, Paragraph } = Typography;
//
const NoticeOfAward = function (props: any) {
    const { supplier, purpose, number, amount, reference, date } = props;
    const { token } = theme.useToken();
    return (
        <div style={{ padding: "5px 25px" }}>
            <Space direction="vertical" size={"large"}>
                {/* Letter Head */}
                <div>
                    <Text
                        style={{
                            fontSize: "1.1em",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                        }}
                    >
                        {supplier?.representative || `[[Please Select the Lowest Bidder]]`}
                    </Text>
                    <br />
                    <Text style={{ fontSize: ".9em", textTransform: "uppercase" }} italic>
                        {supplier?.position || "[[Please Select the Lowest Bidder]]"}
                    </Text>
                    <br />
                    <Text style={{ fontSize: "1.1em", fontWeight: "bold" }}>
                        {supplier?.name || "[[Please Select the Lowest Bidder]]"}
                    </Text>
                    <br />
                    <Text style={{ fontSize: ".9em", textTransform: "uppercase" }}>
                        {supplier?.address || "[[Please Select the Lowest Bidder]]"}
                    </Text>
                </div>
                {/* Letter Head */}
                <div>
                    <br />
                    {/* Letter Opening */}
                    <Text>Maam/Sir</Text>
                    {/* Letter Opening */}
                    <br />
                    <br />
                    <Paragraph style={{ textIndent: "3em", lineHeight: "2em" }}>
                        We are happy to notify you that your quotation dated {date && dayjs(date).format('MMMM DD, YYYY')} for the{" "}
                        <Text italic>{`"${purpose}"`}</Text>, with PR{" "}
                        <Text style={{ color: token.colorPrimary }}>#{number}</Text> for the
                        contract price equivalent to{" "}
                        {amount && (NumberToWords(amount) as string).toUpperCase()} PESOS
                        ONLY (
                        {amount &&
                            Intl.NumberFormat("en", {
                                style: "currency",
                                currency: "PHP",
                            }).format(amount)}
                        ) is hereby accepted.
                    </Paragraph>
                    <Paragraph style={{ textIndent: "3em", lineHeight: "2em" }}>
                        You are hereby required to provide within Ten (10) days a certified
                        photocopy of the following requirements:
                    </Paragraph>
                    <List size="small" split>
                        <List.Item key="1">
                            1. Updated Mayor&apos;s Permit/Business Permit
                        </List.Item>
                        <List.Item key="2">2. PhilGEPS Registration no.</List.Item>
                        <List.Item key="3">3. Latest Income/Business Tax Return</List.Item>
                        <List.Item key="4">
                            4. Duly Notarized Omnibus Sworn Statement
                        </List.Item>
                        <List.Item key="5">
                            5. Certificate of Registration (BIR 2307)
                        </List.Item>
                        <List.Item key="6">6. Land Bank Account Details</List.Item>
                    </List>
                    <Paragraph style={{ textIndent: "3em", lineHeight: "2em" }}>
                        However, If you already have a maintaining and updated file of the
                        above-mentioned requirements in the BAC Office you may no longer
                        require its re-submission (Annex &lsquo;H&rsquo;, Appendix
                        &lsquo;A&rsquo; Section III)
                    </Paragraph>
                    <Paragraph
                        style={{ textIndent: "3em", lineHeight: "2em", fontSize: ".9em" }}
                        italic
                    >
                        *For individuals engaged under Sec. 53.6, 53.7, and 53.9 of the IRR
                        of RA 9184, only the BIR Certificate of Registration shall be
                        submitted in lieu of DTI Registration and Mayor’s Permit.
                    </Paragraph>

                    <br />
                    <br />
                    <Text style={{ fontSize: "1.3em" }}>Thank You</Text>
                    <br />
                    <Text>Very Truly Yours.</Text>
                    <br />
                    <br />
                    <Text
                        style={{
                            fontSize: "1.1em",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                        }}
                    >
                        Doreen C. Castillo
                    </Text>
                    <br />
                    <Text>BAC Chairperson</Text>
                    <br />
                    <br />
                    <Text>{`Date: `.padEnd(25, "_")}</Text>
                    <br />
                    <div style={{ textAlign: "right" }}>
                        <Text>Recieved By:</Text>
                        <br />
                        <br />
                        <Text>{`_`.padEnd(50, "_")}</Text>
                        <br />
                        <Text>Signature Over Printed Name</Text>
                        <br />
                        <br />
                        <Text>{`Date: `.padEnd(25, "_")}</Text>
                    </div>
                    <br />
                    <Text>REF NO. {reference}</Text>
                </div>
            </Space>
        </div>
    );
};

export default memo(NoticeOfAward);
