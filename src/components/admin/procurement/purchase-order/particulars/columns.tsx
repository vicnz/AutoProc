'use client';
import { TableColumnsType } from "antd"

const columns: TableColumnsType = [
    {
        key: 'key',
        dataIndex: 'key',
        title: "No.",
        render: (e: any) => {
            return (
                <span>
                    {`${e}`.padStart(3, '0')}
                </span>
            )
        }
    },
    {
        key: 'unit',
        dataIndex: 'unit',
        title: "Unit",
    },
    {
        key: 'description',
        dataIndex: 'description',
        title: 'Description'
    },
    {
        key: 'qty',
        dataIndex: 'qty',
        title: 'Quantity'
    },
    {
        key: 'price',
        dataIndex: 'price',
        title: 'Unit Price',
        width: 100,
        render: (e: number) => {
            return (
                <span style={{ whiteSpace: 'normal' }}>
                    {Intl.NumberFormat('en', { style: 'currency', currency: 'PHP' }).format(e)}
                </span>
            )
        }
    },
    {
        key: 'amount',
        dataIndex: 'total',
        title: 'Amount',
        width: 100,
        render: (e: number) => {
            return (
                <span style={{ whiteSpace: 'normal' }}>
                    {Intl.NumberFormat('en', { style: 'currency', currency: 'PHP' }).format(e)}
                </span>
            )
        }
    }
]

export default columns;