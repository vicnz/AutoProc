'use client';

//libs
import { Space, Typography } from 'antd';
import { ForwardedRef, forwardRef, memo, useMemo } from 'react';
//components
import PreviewHeader from '../_components/previewheader';
import NumToWords from '@lib/numToWords';
import ApprovalBlock from './aproval-block';
import ContentEditable from '../../_components/content-editable';
//config
const { Paragraph, Text } = Typography
//
const PreviewRecommendingResolution = forwardRef(function (props: { data: any, approval: boolean }, ref: ForwardedRef<any>) {
    const total = useMemo(() => {
        let particulars = props.data.pr.particulars as any[]
        let total = 0;
        particulars.forEach((item, idx) => {
            let sum = item.price * item.qty
            total += sum;
        })
        return total

    }, [props.data])

    return (
        <div ref={ref} style={{ minWidth: 'inherit', width: 'inherit', backgroundColor: 'white', borderRadius: 8, color: 'darkslategray', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
            <PreviewHeader>
                <div style={{ textAlign: 'center', padding: '10px 50px' }}>
                    <ContentEditable style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', minWidth: 500 }} text={`Approval of BAC Resolution Recommending Alternative Mode of Procurement under Small Value Procurement`} />
                </div>
            </PreviewHeader>
            <Space direction='vertical' style={{ width: '100%', padding: '5px 25px' }}>
                <p style={{ textAlign: 'center', padding: 15 }}>BAC RESO {props?.data.pr?.reference}</p>
                <Paragraph style={{ textIndent: '2em', textAlign: 'justify' }}>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>WHEREAS</Text>, <ContentEditable text={`Section 48 Rule XVI of the Revised Implementing Rules and Regulations of RA 9184 allows Alternative Mode of Procurement subject to prior approval of the HOPE thru Annual Procurement Plan (APP) and only to promote economy and efficiency;`} />
                </Paragraph>
                <Paragraph style={{ textIndent: '2em', textAlign: 'justify' }}>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>WHEREAS</Text>, <ContentEditable text={`Section 53.9 allows Small Value Procurement provided that the procurement does not fall under shopping in Section 52 of this IRR and the amount involved does not exceed the thresholds prescribed in Annex "H" of this IRR;`} />
                </Paragraph>
                <Paragraph style={{ textIndent: '2em', textAlign: 'justify' }}>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>WHEREAS</Text>, <ContentEditable text={`Appendix 18, Section 3.e on the Guidelines for Shopping and Small Value Procurement provides an Abstract of Quotations shall be prepared setting forth the names of those who responded to the RFQ's right after the deadline for submission except for shopping under Section 52.1(b), where at least three (3) price quotations (RFQ) must be obtained;`} />
                </Paragraph>
                <Paragraph style={{ textIndent: '2em', textAlign: 'justify' }}>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>WHEREAS</Text>, <ContentEditable text={`Annex "H" of the Consolidated Guidelines for the Alternative Methods of Procurement prescribed under Section V, Paragraph D.8.b.ii that the BAC shall prepare and send the RFQs/RFPs to at least three (3) suppliers, contractors or consultants of known qualifications where receipt of at least one (1) quotations is sufficient to proceed with the evaluation thererof`} />
                </Paragraph>
                <Paragraph style={{ textIndent: '2em', textAlign: 'justify' }}>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>WHEREAS</Text>, Purchase Request No. {props.data?.pr?.pr_no} Amounting to {Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(total)} ({NumToWords(total).toUpperCase()} PESOS) involves procurement of (<Text>{(props.data?.pr?.particulars as any[]).map((item, idx) => item.description).join(', ')}</Text>)  with the approved budget of {Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(props?.data?.pr?.budget)}  ({NumToWords(props?.data?.pr?.budget).toUpperCase()} PESOS)
                </Paragraph>
                <Paragraph style={{ textIndent: '2em', textAlign: 'justify' }}>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>WHEREAS</Text>, <ContentEditable text={`the default mode of evaluation shall be on a lot basis which means that the determination of the single/lowest calculated and responsive bid (S/LCRB) is the total amount of offered unit price multiply by the required quantity;`} />
                </Paragraph>
                {
                    props.approval ?
                        <Paragraph style={{ textIndent: '2em', textAlign: 'justify' }}>
                            <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>NOW THEREFOR</Text>, I, <ContentEditable text={`DR.DJOVI R. DURANTE`} style={{ textTransform: 'uppercase', fontWeight: 'bold' }} />, <ContentEditable text={`Head of the Procuring Entity (HOPE) by virtue of the authority vested in me by the Board of Trustees of this Institution and after taking into consideration the merits and legal bases of the recommendation of the members of the Bids and Awards Committee (BAC) do hereby APPROVE the foregoing recommendation and adoption of Alternative Mode of Procurement under Small Value Procurement;`} />
                        </Paragraph> :
                        <Paragraph style={{ textIndent: '2em', textAlign: 'justify' }}>
                            <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>NOW THEREFOR</Text>, we, the members of the Bids and Awards Committee hereby <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>RESOLVE</Text> as it is hereby <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>RESOLVED</Text> <ContentEditable text={`to recommend to the College President to adopt Alternative Mode of Procurement under Small Value Procurement for the said transaction;`} />
                        </Paragraph>
                }
                <Paragraph style={{ textIndent: '2em', textAlign: 'justify' }}>
                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>RESOLVED FINALLY</Text>, at the Batanes State College, this &nbsp;&nbsp;&nbsp;<Text underline>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                </Paragraph>
            </Space>
            <div style={{ padding: '5px 25px', width: 'inherit' }}>
                <ApprovalBlock
                    appoval={props.approval}
                    enduser={{
                        name: `${props?.data?.pr?.enduser?.fname} ${props?.data?.pr?.enduser?.mname ? props?.data?.pr?.enduser?.mname + '. ' : ''}${props?.data?.pr?.enduser?.lname}`,
                        department: props?.data?.pr?.enduser?.department.description
                    }}
                />
            </div>
            <br /><br />
        </div >
    )
})

export default memo(PreviewRecommendingResolution);