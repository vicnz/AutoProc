"use client";

const { Paragraph, Text } = Typography;
import { Space, Typography } from "antd";

import ContentEditable from "@components/admin/features/content-editable";
import dayjs from "dayjs";
//
interface ContentPaneProps {
    data: {
        reference: string;
        number: string; // pr number
        total: string;
        particulars: string; //item1, item2, and item3,
        budget: string; //$00.00
    };
    approval: boolean;
}
const ContentPane = function (props: ContentPaneProps) {
    return (
        <>
            <Space direction="vertical" style={{ width: "100%", padding: "0px 25px" }}>
                <p style={{ textAlign: "center", padding: 5 }}>BAC RESO {props.data.reference}</p>
                <Paragraph
                    style={{
                        textIndent: "2em",
                        textAlign: "justify",
                        lineHeight: "1.8em",
                    }}
                >
                    <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>WHEREAS</Text>,
                    <ContentEditable
                        text={` Section 48 Rule XVI of the Revised Implementing Rules and Regulations of RA 9184 allows Alternative Mode of Procurement subject to prior approval of the HOPE thru Annual Procurement Plan (APP) and only to promote economy and efficiency;`}
                    />
                </Paragraph>
                <Paragraph
                    style={{
                        textIndent: "2em",
                        textAlign: "justify",
                        lineHeight: "1.8em",
                    }}
                >
                    <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>WHEREAS</Text>,&nbsp;
                    <ContentEditable
                        text={`Section 53.9 allows Small Value Procurement provided that the procurement does not fall under shopping in Section 52 of this IRR and the amount involved does not exceed the thresholds prescribed in Annex "H" of this IRR;`}
                    />
                </Paragraph>
                <Paragraph
                    style={{
                        textIndent: "2em",
                        textAlign: "justify",
                        lineHeight: "1.8em",
                    }}
                >
                    <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>WHEREAS</Text>,&nbsp;
                    <ContentEditable
                        text={`Appendix 18, Section 3.e on the Guidelines for Shopping and Small Value Procurement provides an Abstract of Quotations shall be prepared setting forth the names of those who responded to the RFQ's right after the deadline for submission except for shopping under Section 52.1(b), where at least three (3) price quotations (RFQ) must be obtained;`}
                    />
                </Paragraph>
                <Paragraph
                    style={{
                        textIndent: "2em",
                        textAlign: "justify",
                        lineHeight: "1.8em",
                    }}
                >
                    <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>WHEREAS</Text>,&nbsp;
                    <ContentEditable
                        text={`Annex "H" of the Consolidated Guidelines for the Alternative Methods of Procurement prescribed under Section V, Paragraph D.8.b.ii that the BAC shall prepare and send the RFQs/RFPs to at least three (3) suppliers, contractors or consultants of known qualifications where receipt of at least one (1) quotations is sufficient to proceed with the evaluation thererofe`}
                    />
                </Paragraph>
                <Paragraph
                    style={{
                        textIndent: "2em",
                        textAlign: "justify",
                        lineHeight: "1.8em",
                    }}
                >
                    <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>WHEREAS</Text>, Purchase Request
                    No. {props.data.number} involves the procurement of ({props.data.particulars}) with the approved
                    budget of {props.data.total}
                </Paragraph>
                <Paragraph
                    style={{
                        textIndent: "2em",
                        textAlign: "justify",
                        lineHeight: "1.8em",
                    }}
                >
                    <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>WHEREAS</Text>,{" "}
                    <ContentEditable
                        text={`the default mode of evaluation shall be on a lot basis which means that the determination of the single/lowest calculated and responsive bid (S/LCRB) is the total amount of offered unit price multiply by the required quantity;`}
                    />
                </Paragraph>
                {props.approval ? (
                    <Paragraph
                        style={{
                            textIndent: "2em",
                            textAlign: "justify",
                            lineHeight: "1.8em",
                        }}
                    >
                        <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>NOW THEREFOR</Text>, I,{` `}
                        <ContentEditable
                            style={{ textTransform: "uppercase", fontWeight: "bold" }}
                            text={`DR. DJOVI R. DURANTE`}
                        />
                        ,&nbsp;
                        <ContentEditable
                            text={`Head of the Procuring Entity (HOPE) by virtue of the authority vested in me by the Board of Trustees of this Institution and after taking into consideration the merits and legal bases of the recommendation of the members of the Bids and Awards Committee (BAC) do hereby APPROVE the foregoing recommendation and adoption of Alternative Mode of Procurement under Small Value Procurement;`}
                        />
                    </Paragraph>
                ) : (
                    <Paragraph
                        style={{
                            textIndent: "2em",
                            textAlign: "justify",
                            lineHeight: "1.8em",
                        }}
                    >
                        <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>NOW THEREFOR</Text>,&nbsp;
                        <ContentEditable
                            text={`we, the members of the Bids and Awards Committee hereby to recommend to the College President to adopt Alternative Mode of Procurement under Small Value Procurement for the said transaction;`}
                        />
                    </Paragraph>
                )}
                <Paragraph
                    style={{
                        textIndent: "2em",
                        textAlign: "justify",
                        lineHeight: "1.8em",
                    }}
                >
                    <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>RESOLVED FINALLY</Text>, at the
                    Batanes State College, this{" "}
                    <span style={{ display: "inline-block", width: 50, borderBottom: "1px solid black" }} /> of
                    <span style={{ display: "inline-block", width: 100, borderBottom: "1px solid black" }} />{" "}
                    {dayjs().format(`YYYY`)}
                </Paragraph>
            </Space>
        </>
    );
};

export default ContentPane;
