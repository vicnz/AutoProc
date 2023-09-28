'use client';
import { Descriptions, Space, Table, TableColumnType, TableColumnsType, TableProps } from 'antd';
import { ForwardedRef, forwardRef, useMemo } from 'react'
import PreviewHeader from '../_components/previewheader'
import type { PrismaModels } from '@lib/db'
import dayjs from 'dayjs';
import ApprovalBlock from './approval'

type AbstactofQuotation = Pick<PrismaModels['abstract'], 'biddingPlace' | 'final' | 'quotations' | 'prId' | 'id' | 'lowestAmount' | 'lowestBidder' | 'date'> & { pr: { particulars: Array<{ qty: number, description: string }> }, price_quotation: { suppliers: Array<{ id: string, name: string }> } }

const AbstactofQuotation = forwardRef(function (props: { data: AbstactofQuotation }, ref: ForwardedRef<any>) {

    const columns: TableColumnsType = useMemo(() => {
        const columns = [
            {
                key: '',
                dataIndex: 'key',
                title: '#',
                width: 25,
                render: (e: number) => {
                    return <span>{e + 1}</span>
                }
            },
            {
                key: 'supplier',
                dataIndex: 'supplier',
                title: 'Supplier',
                width: 200,
                render: (e: string) => {
                    return <span style={{ whiteSpace: 'normal', fontSize: '.8em' }}>{e}</span>
                }
            },
            ...(props.data.quotations as Array<{ supplier: string, items: Array<{ qty: number, description: string, price: number }> }>)[0].items
                .map((item, idx) => {
                    return {
                        key: item.description,
                        dataIndex: ['items'],
                        width: 150,
                        title: (<span style={{ fontSize: '.8em', whiteSpace: 'normal' }}>{item.description}</span>),
                        render: (e: any) => {
                            const total = e[idx].price * e[idx].qty
                            return (<span style={{ fontSize: '.8em' }}>{total > 0 ? Intl.NumberFormat('en-US', { style: 'decimal' }).format(total) : 'none'}</span>)
                        }
                    }
                }),
            {
                key: 'total',
                title: 'Total',
                dataIndex: ['items'],
                render: (e: Array<{ price: number, qty: number }>) => {
                    let total = 0
                    e.map(item => { total += item.price * item.qty })
                    return (<span style={{ whiteSpace: 'normal', fontSize: '.8em' }}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(total)}</span>)
                }
            }

        ]
        return columns;
    }, [props.data])

    const datasource = useMemo(() => {
        const dataset = (props.data.quotations as Array<{ supplier: string, items: Array<{ qty: number, description: string, price: number }> }>)
            .map((item, idx) => {
                return ({ ...item, key: idx })
            })
        return dataset;
    }, [props.data])



    return (
        <div ref={ref} style={{ minWidth: 'inherit', width: 'inherit', backgroundColor: 'white', borderRadius: 8, color: 'darkslategray', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
            <PreviewHeader>
                <p style={{ textAlign: 'center', fontSize: '1.3em', fontWeight: 'bold' }}>Abstract of Quotation</p>
            </PreviewHeader>
            <br />
            <Descriptions size={'small'} style={{ padding: '5px 25px' }} bordered layout='vertical' column={5}>
                <Descriptions.Item label="Bidding Location" span={3}>
                    <p style={{ textTransform: 'capitalize' }}>
                        {props.data.biddingPlace}
                    </p>
                </Descriptions.Item>
                <Descriptions.Item label="Date" span={2}>
                    {
                        dayjs(props.data.date).format('MM/DD/YYYY')
                    }
                </Descriptions.Item>
                <Descriptions.Item span={4} label="Note">
                    <div style={{ fontSize: '.9em' }}>
                        {`(✅) Furnishing/delivery of supplies, and  materials or equipment`.padEnd(50)} <br></br>
                        {`(✅) Furnishing Labor, services, etc.`} <br></br>
                        {`(✅) Rental or use of transportation facilities equipment, quarters, rooms, lot or space, etc.`}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Furnished At">
                    {`Batanes State College`}
                </Descriptions.Item>
                <Descriptions.Item label={null} >
                    <div style={{ fontSize: '.8em' }}>
                        {`(State place or site of Office or project where articles or services be furnished or returned)`}
                    </div>
                </Descriptions.Item>
            </Descriptions>
            <Table bordered style={{ padding: '5px 25px' }} columns={columns as any} dataSource={datasource as any} pagination={false} />
            <div style={{ padding: '5px 25px', width: 'inherit' }}>
                <Descriptions size="small" bordered title="Lowest Calculated Bidder" layout='vertical'>
                    <Descriptions.Item label="Lowest Calculated Amount">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(Number.parseFloat(props.data.lowestAmount.toString()))}</Descriptions.Item>
                    <Descriptions.Item label="Bidder">
                        {
                            !(props.data.lowestBidder === null || props.data.lowestBidder?.length < 1) ?
                                (JSON.parse(props.data.lowestBidder).name) :
                                'N/A'
                        }
                    </Descriptions.Item>
                </Descriptions>
                <br />
                <ApprovalBlock
                    enduser={{
                        //@ts-ignore
                        name: `${props?.data?.pr?.enduser?.fname} ${props?.data?.pr?.enduser?.mname ? props?.data?.pr?.enduser?.mname + '. ' : ''}${props?.data?.pr?.enduser?.lname}`,
                        //@ts-ignore
                        department: props?.data?.pr?.enduser?.department.description
                    }}
                />
            </div>
            <br /><br />
        </div >
    )
})


export default AbstactofQuotation;