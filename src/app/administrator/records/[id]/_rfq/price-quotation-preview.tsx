'use client';

import { Descriptions, List, Table, TableColumnsType, Typography } from "antd";
import dayjs from "dayjs";
import PreviewHeader from '../_components/previewheader'
import NumToWords from '@lib/numToWords'
import { memo, useState } from "react";

const { Text } = Typography
const columns: TableColumnsType = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        ellipsis: true,
        width: 75,
        render: (e: number) => {
            const number = Intl.NumberFormat().format(e).padStart(3, '0')
            return (<span>{number}</span>)
        }
    },
    {
        title: 'Qty',
        dataIndex: "qty",
        key: "qty",
        ellipsis: true,
        width: 75,
        render: (e: any) => {
            return (<span style={{ whiteSpace: 'normal' }} key={e}>{e}</span>)
        }

    },
    {
        title: 'Unit',
        dataIndex: "unit",
        key: "unit",
        ellipsis: true,
        width: 100,
        render: (e: string) => {
            return (
                <span style={{ whiteSpace: 'normal' }} key={e}>{e}</span>
            )
        }
    },
    {
        title: 'Item Description',
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        render: (e: string) => {
            return (
                <span style={{ whiteSpace: 'normal' }} key={e}>
                    {e}
                </span>
            )
        }
    },
    {
        title: 'Unit Price',
        dataIndex: "price",
        key: "price",
        ellipsis: true,
        width: 150,
        render: (e: number) => {
            return (
                <></>
                // <span style={{ whiteSpace: 'normal' }} key={e}>{number}</span>
            )
        }
    },
    {
        title: 'Total',
        dataIndex: "",
        key: "total",
        width: 150,
        ellipsis: true,
        render: (e: any) => {
            return (
                <></>
                // <span key={e} style={{ whiteSpace: 'normal' }}>{number}</span>
            )
        },
    },
]
const PriceQuotationPreview = function (props: { data: any, supplier: any }) {
    const [approval, setApproval] = useState('Dr. Djovi Regala Durante')
    const [office, setOffice] = useState('College President')

    return (
        <>
            <PreviewHeader height={175}>
                <div>
                    <p style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold' }}>Request for Price Quotation</p>
                </div>
            </PreviewHeader>
            <Descriptions style={{ padding: '5px 25px' }} bordered layout='vertical' size="small" column={5}>
                <Descriptions.Item label="Supplier" span={4} style={{ fontWeight: 'bold', whiteSpace: 'normal' }}>
                    {props.supplier?.padEnd(50, '\u2002')}
                </Descriptions.Item>
                <Descriptions.Item label="Date" span={1} contentStyle={{ maxWidth: 200 }}>{dayjs(props?.data.date).format('MM/DD/YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Note" span={5}>
                    <List size='small' >
                        <List.Item key={0} style={{ fontSize: '.9em' }}>Please give us your best and final price offer for the item/s listed below, have this signed and submit this by you or by your duly authorized representative WITHIN SEVEN (7) CALENDAR DAYS upon receipt to Procurement Section, Batanes State College.</List.Item>
                        <List.Item key={1} style={{ fontSize: '.8em' }}>1. THE DEFAULT MODE OF PRICE EVALUATION SHALL BE ON A LOT BASIS, OTHERWISE PER ITEMS EVALUATION SHALL BE USED IF THERE WILL BE LACKING ITEMS IN ALL RFQ's AND SUBJECT TO END-USER APPROVAL., (Clause 15.2, Section I, Instruction to Bidders of the Philippine Bidding Documents for goods and infrastructure projects)</List.Item>
                        <List.Item key={2} style={{ fontSize: '.8em' }}>2. DELIVERY PERIOD: &lt;30, 60, OR 90 calendar days&gt;</List.Item>
                        <List.Item key={3} style={{ fontSize: '.8em' }}>3. Submission of price quotation shall be in sealed envelope.</List.Item>
                        <List.Item key={4} style={{ fontSize: '.8em' }}>4. THE APPROVED BUDGET FOR THIS PROCUREMENT IS {Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(props?.data?.pr?.budget)} ({NumToWords(props?.data?.pr?.budget).toUpperCase()} PESOS) (GPPB Resolution No. 09-2009)</List.Item>
                        <List.Item key={5} style={{ fontSize: '.8em' }}>5. PURSUANT TO ANNEX "H", APPENDIX A, SECTION II, SUBMISSION OF APPLICABLE DOCUMENTS (e.g.MAYORS/BUSINESS PERMIT, PROFESSIONAL LICENSE/CURRICULUM VITAE (CONSULTING SEERVICES),PHILGEPS CERT. NO., PCAB LICENSE (INFRA), INCOME/BUSINESS TAX RETURN,OMNIBUS SWORN STATEMENT SHALL BE REQUIRED BEFORE THE ISSUANCE OF NOA OR PRIOR TO PAYMENT.</List.Item>
                        <List.Item key={6} style={{ fontSize: '.8em' }}>6. In case the item is not availble, please write "None".</List.Item>
                    </List>
                </Descriptions.Item>
            </Descriptions>
            <Table bordered columns={columns as any} dataSource={(props.data?.pr?.particulars).map((item: any, idx: number) => ({ ...item, key: (idx + 1) }))} style={{ padding: '5px 25px' }} pagination={false} summary={renderSummary as any} />
            <div style={{ padding: '5px 25px' }}>
                <p style={{ fontSize: '.9em' }}>After having carefully read and accepted your conditions, I/We have place my /our best and final price offer on the item/s listed above.</p>
                <Descriptions layout='vertical' column={2} bordered size="small">
                    <Descriptions.Item label="Representative" span={1}>
                        <div style={{ height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ width: '100%', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }} >{`PRINTED NAME/SIGNATURE`}</Text>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Approval" span={1}>
                        <div style={{ height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ width: '100%', borderBottom: 'solid lightgray 2px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }} editable={{ text: approval, triggerType: ['text'], onChange(value) { setApproval(value) }, }}>{approval}</Text>
                            <Text style={{ width: '100%', textAlign: 'center' }} editable={{ text: office, triggerType: ['text'], onChange(value) { setOffice(value) }, }}>{office}</Text>
                        </div>
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                    <Descriptions.Item label="Reference No:">
                        {props?.data?.pr?.reference}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    )
}

const renderSummary = (pageData: any[]) => {

    let count = pageData.length
    return (
        <>
            {
                new Array(8 - count).fill(0).map((item, idx) => {
                    return (
                        <Table.Summary.Row key={idx + '-row'}>
                            {
                                new Array(6).fill(0).map((item, idx) => {
                                    return (
                                        <Table.Summary.Cell index={idx} key={idx + '-cell-spacer'}></Table.Summary.Cell>
                                    )
                                })
                            }
                        </Table.Summary.Row>
                    )
                })
            }
            <Table.Summary.Row>
                <Table.Summary.Cell index={0} key={'1-cell'}></Table.Summary.Cell>
                <Table.Summary.Cell index={1} key={'2-cell'}></Table.Summary.Cell>
                <Table.Summary.Cell index={2} key={'3-cell'}></Table.Summary.Cell>
                <Table.Summary.Cell index={3} key={'4-cell'}></Table.Summary.Cell>
                <Table.Summary.Cell index={4} key={'5-cell'}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={5} key={'6-cell'}></Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    )
}

export default memo(PriceQuotationPreview);