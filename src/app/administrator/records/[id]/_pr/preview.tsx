'use client';
import { Descriptions, Table, TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { ForwardedRef, forwardRef, memo } from 'react';
//components
import type { IAPIReturnType } from './types'
import PreviewHeader from '../_components/previewheader';
import ApprovalBlock from './approval';
import RenderSummary from './summary';
//configs
const columns: TableColumnsType = [
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
        width: 50,
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
        width: 200,
        render: (e: string) => {
            return (
                <span style={{ whiteSpace: 'normal' }} key={e}>
                    {e}
                </span>
            )
        }
    },
    {
        title: 'Stock',
        dataIndex: "stock_no",
        key: "stock_no",
        ellipsis: true,
        width: 75,
        render: (e: any) => {
            return (<span style={{ whiteSpace: 'normal' }} key={e}>{e}</span>)
        }
    },
    {
        title: 'Unit Price',
        dataIndex: "price",
        key: "price",
        ellipsis: true,
        width: 100,
        render: (e: number) => {
            const number = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP'
            }).format(e)
            return (
                <span style={{ whiteSpace: 'normal' }} key={e}>{number}</span>
            )
        }
    },
    {
        title: 'Total',
        dataIndex: "total",
        key: "total",
        width: 100,
        ellipsis: true,
        render: (e: any) => {
            const number = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP'
            }).format(e)
            return (
                <span style={{ whiteSpace: 'normal' }} key={e}>{number}</span>
            )
        },
    },
]
//
const PreviewPurchaseRequest = forwardRef(function (props: { data: IAPIReturnType }, ref: ForwardedRef<any>) {
    return (
        <div ref={ref} style={{ minWidth: 'inherit', backgroundColor: 'white', borderRadius: 8, color: 'darkslategray', display: 'grid', gridTemplateRows: 'auto auto 1fr auto' }}>
            {/* PREVIEW HEAD */}
            <PreviewHeader>
                <p style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold' }}>Purchase Request</p>
            </PreviewHeader>
            {/* PREVIEW HEAD */}
            <br />
            {/* PR DETAILS */}
            <Descriptions bordered size='small' style={{ padding: '5px 25px' }} column={{ lg: 3, md: 3, xl: 3 }} layout='vertical'>
                <Descriptions.Item label="PR Number" span={2}>{props.data?.pr_no}</Descriptions.Item>
                <Descriptions.Item label="Date">{dayjs(props.data.date).format('MM/DD/YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Reference No.">BAC-RESO No. {props.data?.reference}</Descriptions.Item>
                <Descriptions.Item label="OBR">{props.data?.obr}</Descriptions.Item>
                <Descriptions.Item label="SAI">{props.data?.sai}</Descriptions.Item>
                <Descriptions.Item label="Department">{props.data.department}</Descriptions.Item>
                <Descriptions.Item label="Section">{props.data.section}</Descriptions.Item>
            </Descriptions>
            {/* PR DETAILS */}
            {/* PR PARTICULARS */}
            <Table bordered columns={columns as any} dataSource={props.data.particulars} style={{ padding: '5px 25px' }} pagination={false} summary={RenderSummary as any} />
            {/* PR PARTICULARS */}
            <div style={{ padding: '5px 25px', width: 'inherit' }}>
                {/* PR PURPOSE */}
                <Descriptions layout='vertical' size='small' bordered>
                    <Descriptions.Item label="Purpose">
                        {props?.data?.purpose || <div style={{ height: 50 }}>N/A</div>}
                    </Descriptions.Item>
                </Descriptions>
                {/* PR PURPOSE */}
                <br />
                {/* APPROVAL BLOCK */}
                <ApprovalBlock data={props.data} />
                {/* APPROVAL BLOCK */}
            </div>
            <br />
        </div >
    )
})



export default memo(PreviewPurchaseRequest);