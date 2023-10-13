'use client'
import { TableColumnsType } from "antd"

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

export default columns;