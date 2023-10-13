import { TableColumnsType } from "antd";

const columns: TableColumnsType = [
    //QUANTITY
    {
        title: "Qty",
        dataIndex: "qty",
        key: "qty",
        ellipsis: true,
        width: 75,
        render: (e: any) => {
            return (
                <span style={{ whiteSpace: "normal" }} key={e}>
                    {e}
                </span>
            );
        },
    },
    //UNIT
    {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
        ellipsis: true,
        width: 50,
        render: (e: string) => {
            return (
                <span style={{ whiteSpace: "normal" }} key={e}>
                    {e}
                </span>
            );
        },
    },
    {
        title: "Item Description",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        width: 200,
        render: (e: string) => {
            return (
                <span style={{ whiteSpace: "normal" }} key={e}>
                    {e}
                </span>
            );
        },
    },
    {
        title: "Stock",
        dataIndex: "stock_no",
        key: "stock_no",
        ellipsis: true,
        width: 75,
        render: (e: any) => {
            return (
                <span style={{ whiteSpace: "normal" }} key={e}>
                    {e}
                </span>
            );
        },
    },
    {
        title: "Unit Price",
        dataIndex: "price",
        key: "price",
        ellipsis: true,
        width: 100,
        render: (e: number) => {
            const number = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "PHP",
            }).format(e);
            return (
                <span style={{ whiteSpace: "normal" }} key={e}>
                    {number}
                </span>
            );
        },
    },
    {
        title: "Total",
        dataIndex: "total",
        key: "total",
        width: 100,
        ellipsis: true,
        render: (e: any) => {
            const number = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "PHP",
            }).format(e);
            return (
                <span style={{ whiteSpace: "normal" }} key={e}>
                    {number}
                </span>
            );
        },
    },
];

export default columns;
