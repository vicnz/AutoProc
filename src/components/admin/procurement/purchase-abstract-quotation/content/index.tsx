import { Descriptions, Table, TableColumnType, TableColumnsType } from "antd";
import { useMemo } from "react";

type IQuotationType = {
    supplier: string;
    id: string;
    total: number;
};

const RenderAbstractQuotations = function (props: {
    quotations: Array<IQuotationType & { [key: string]: number }>;
    bidder: { supplier: string; amount: number };
    suppliers: Array<{ id: string; name: string }>;
}) {
    const keys = Object.getOwnPropertyNames(props.quotations[0]).filter(
        (item) => item !== "id"
    );
    const Columns: TableColumnsType = useMemo(() => {
        const columns = [
            ...keys.map((item, idx) => {
                return {
                    key: item + idx,
                    dataIndex: item,
                    title: (
                        <span style={{ textTransform: "capitalize", fontSize: ".9em" }}>
                            {item}
                        </span>
                    ),
                    render: (e: any) => {
                        if (typeof e === "number") {
                            const toCurrency = Intl.NumberFormat("en", {
                                style: "currency",
                                currency: "PHP",
                            }).format(e);
                            return (
                                <span style={{ whiteSpace: "normal", fontSize: ".9em" }}>
                                    {toCurrency}
                                </span>
                            );
                        } else {
                            return (
                                <span style={{ whiteSpace: "normal", fontSize: ".9em" }}>
                                    {e}
                                </span>
                            );
                        }
                    },
                };
            }),
        ];
        return columns;
    }, [keys]);

    const dataSource = useMemo(() => {
        return props.quotations.map((item) => ({ ...item, key: item.id }));
    }, [props.quotations]);


    const selectedSupplier = useMemo(() => {
        return (props.suppliers.filter((item) => item.id === props.bidder.supplier))[0]?.name || `N/A`;
    }, [props.suppliers, props.bidder.supplier]);

    return (
        <div style={{ padding: "5px 25px" }}>
            <Table
                columns={Columns as any}
                dataSource={dataSource}
                pagination={false}
                bordered
            />
            <br />
            <Descriptions size="small" layout="vertical" bordered>
                <Descriptions.Item label="Lowest Bidder">
                    {selectedSupplier?.padEnd(50, "\u2002")}
                </Descriptions.Item>
                <Descriptions.Item label="Lowest Rendered Amount">
                    {Intl.NumberFormat("en", {
                        style: "currency",
                        currency: "PHP",
                    }).format(props.bidder.amount)}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default RenderAbstractQuotations;
