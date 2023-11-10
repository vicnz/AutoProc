import { Typography } from "antd";
import dayjs from "dayjs";
import ContentEditable from "@components/admin/features/content-editable";
import Content from "./content";
import Approval from "@components/admin/procurement/purchase-signatures";
import { memo, useMemo } from "react";

const { Paragraph, Text } = Typography;

const BACResolutionPreview = function (props: { type: "approve" | "review" | "notice"; data: any }) {
    const { particulars, number, rfqDate, quotations, budget, supplier, enduser, subTotal } = props.data;
    return (
        <div style={{ padding: "5px 25px" }}>
            <br />
            <Paragraph style={{ textIndent: "2em", lineHeight: "2em" }}>
                <Text strong>WHEREAS</Text> the BATANES STATE COLLEGE advertised the Request for Price Quotation (RFQ)
                for the {particulars} with PR #{number} dated {dayjs(rfqDate).format(`MMMM D, YYYY`)}.
            </Paragraph>
            <Paragraph style={{ textIndent: "2em", lineHeight: "2em" }}>
                <Text strong>WHEREAS</Text>&nbsp;
                <Text>
                    from the period the Request for Price Quotation (RFQ) has started up to the time of bid submission
                    and opening, Nine (9) prospective bidder were able to submit the RFQ;
                </Text>
            </Paragraph>
            <Paragraph style={{ textIndent: "2em", lineHeight: "2em" }}>
                <Text strong>WHEREAS</Text>&nbsp;
                <Text>
                    the Price Quotation based on the Lowest Calculated & Responsive Bid (LCRB) format of the bidders
                    were opened and its bid price was read as follows:
                </Text>
            </Paragraph>
            <Content data={quotations} abc={subTotal} />
            {props.type === "review" ? (
                <>
                    <br />
                    <Paragraph style={{ textIndent: "2em", lineHeight: "2em" }}>
                        1. To declare <Text strong>{props.data.supplier.name || "".padEnd(15, "_")}</Text> as supplier
                        with the Lowest Calculated & Responsive Bid for the ({props.data.particulars}), with PR #
                        {props.data.number} dated {dayjs(props.data.rfqDate).format(`MMMM D, YYYY`)}.
                    </Paragraph>
                    <Paragraph style={{ textIndent: "2em", lineHeight: "2em" }}>
                        2. To recommend for approval by the Head of Procuring Entity of the Batanes State College the
                        foregoing findings.
                    </Paragraph>
                    <Paragraph style={{ lineHeight: "2em" }}>
                        <Text strong>RESOLVED FINALLY</Text>, at the Bids & Award Committee Office, Batanes State
                        College, this _______day of________
                    </Paragraph>
                    <Approval approval={false} enduser={props.data.enduser} />
                </>
            ) : (
                <>
                    <br />
                    <Paragraph style={{ textIndent: "2em", textAlign: "justify", lineHeight: "2em" }}>
                        <Text style={{ textTransform: "uppercase", fontWeight: "bold" }}>NOW THEREFOR I</Text>,{" "}
                        <ContentEditable
                            text={`DR.DJOVI R. DURANTE`}
                            style={{ textTransform: "uppercase", fontWeight: "bold" }}
                        />
                        , by virtue of the authority vested in me of this institution and after taking into
                        consideration the merits and legal bases of the recommendation of the members of the Bids and
                        Awards Committee (BAC) do hereby <strong>APPROVE</strong> the following;
                    </Paragraph>
                    <Paragraph style={{ textIndent: "2em", lineHeight: "2em" }}>
                        To declare <Text strong>{props.data.supplier.name || "".padEnd(15, "_")}</Text> as supplier with
                        the Lowest Calculated & Responsive Bid for the {props.data.particulars}, with PR #
                        {props.data.number} dated {dayjs(props.data.rfqDate).format(`MMMM D, YYYY`)}.
                    </Paragraph>
                    <Paragraph style={{ lineHeight: "2em" }}>
                        Done this _______day of________ {dayjs().format("YYYY")}
                    </Paragraph>
                    <Approval approval={true} single={true} />
                </>
            )}
        </div>
    );
};
export default memo(BACResolutionPreview);
