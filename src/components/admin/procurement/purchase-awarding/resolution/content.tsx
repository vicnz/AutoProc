import { Table, TableColumnsType } from "antd"
import { useMemo } from "react"

const Columns: TableColumnsType = [
    {
        key: 'indexNum',
        dataIndex: 'key',
        title: "Item No.",
        render: (e: number) => {
            return <span>{e.toString().padStart(2, '0')}</span>
        }
    },
    {
        key: 'supplier',
        dataIndex: 'supplier',
        title: 'Bidder with Calculated Bid',
    },
    {
        key: 'abc',
        dataIndex: 'abc',
        title: "ABC",
        render: (e: number) => {
            return <span>{Intl.NumberFormat('en', { style: 'currency', currency: 'PHP' }).format(e)}</span>
        }
    },
    {
        key: 'total',
        dataIndex: 'total',
        title: 'Bid Amount',
        render: (e: number) => {
            return <span>{Intl.NumberFormat('en', { style: 'currency', currency: 'PHP' }).format(e)}</span>
        }
    }
]

const Content = function (props: { data: any[], abc: number }) {
    const dataSource = useMemo(() => {
        const data = props.data.map((item, idx) => {
            return { ...item, key: idx + 1, abc: props.abc }
        })
        return data;
    }, [props.data, props.abc])
    return (
        <>
            <Table columns={Columns as any} dataSource={dataSource as any} pagination={false} bordered />
        </>
    )
}

export default Content;