import { Descriptions, Table, TableColumnType, TableColumnsType } from "antd";
import { useMemo } from "react";
import { ToPeso } from "@lib/intl/currency";

const RenderAbstractQuotations = function (props: {
    quotationsSum: Array<number>,
    quotations: Array<{ [key: string]: any }>;
    bidder: { supplier: string; amount: number };
    suppliers: Array<{ id: string; name: string }>;
}) {
    const toCurrency = Intl.NumberFormat("en", {
        style: "currency",
        currency: "PHP",
    });

    const keys = Object.getOwnPropertyNames(props.quotations[0]).filter((item) => item !== "id");

    const NewColumns: TableColumnsType = useMemo(() => {

        const columns = keys.map((item, idx) => {
            return {
                key: item,
                dataIndex: item,
                title: <span style={{ textTransform: "capitalize", fontSize: ".9em" }}>{item}</span>,
                render: (e: any) => {
                    if (!e.supplier) {
                        return <span style={{ whiteSpace: "normal", fontSize: ".9em" }}>{e}</span>;
                    } else {
                        return <span style={{ whiteSpace: "normal", fontSize: ".9em" }}>{toCurrency.format(e.total)}</span>
                    }
                }
            }
        })
        return columns;
    }, [keys, toCurrency])

    // const Columns: TableColumnsType = useMemo(() => {
    //     const columns = [
    //         ...keys.map((item, idx) => {
    //             return {
    //                 key: item + idx,
    //                 dataIndex: item,
    //                 title: <span style={{ textTransform: "capitalize", fontSize: ".9em" }}>{item}</span>,
    //                 render: (e: any) => {
    //                     if (typeof e === "number") {
    //                         const toCurrency = Intl.NumberFormat("en", {
    //                             style: "currency",
    //                             currency: "PHP",
    //                         }).format(e);
    //                         return <span style={{ whiteSpace: "normal", fontSize: ".9em" }}>{toCurrency}</span>;
    //                     } else {
    //                         return <span style={{ whiteSpace: "normal", fontSize: ".9em" }}>{e}</span>;
    //                     }
    //                 },
    //             };
    //         }),
    //     ];
    //     return columns;
    // }, [keys]);

    const dataSource = useMemo(() => {
        return props.quotations.map((item) => ({ key: item.id, ...item, }));
    }, [props.quotations]);

    const selectedSupplier = useMemo(() => {
        return props.suppliers.filter((item) => item.id === props.bidder.supplier)[0]?.name || `N/A`;
    }, [props.suppliers, props.bidder.supplier]);

    return (
        <div style={{ padding: "5px 25px" }}>
            <Table size="middle" columns={NewColumns as any} dataSource={dataSource} pagination={false} bordered
                summary={(data: readonly { key: any; }[]) => {
                    const rowPadding = Math.max(10 - props.quotations.length)
                    return (
                        <>
                            {
                                (rowPadding > 0) ?
                                    (
                                        <>
                                            {
                                                new Array(rowPadding).fill(0).map((item, idx) => {
                                                    return (
                                                        <Table.Summary.Row key={idx}>
                                                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                                            {new Array(props.quotationsSum.length).fill(0).map((item, subidx) => {
                                                                return <Table.Summary.Cell index={subidx + 1} key={subidx + 1}></Table.Summary.Cell>
                                                            })}
                                                        </Table.Summary.Row>
                                                    )
                                                })
                                            }
                                        </>
                                    ) : null
                            }
                            <Table.Summary.Row style={{ background: '#F5F5F5', fontWeight: 'bold' }}>
                                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                                {
                                    props.quotationsSum.map((item, idx) => {
                                        return (
                                            <Table.Summary.Cell index={idx + 1} key={idx + 1}>
                                                {ToPeso(item)}
                                            </Table.Summary.Cell>
                                        )
                                    })
                                }
                            </Table.Summary.Row>
                        </>
                    )
                }}
            />
            <div style={{ height: 5 }}></div>
            <Descriptions size="small" layout="vertical" bordered>
                <Descriptions.Item label="Lowest Bidder">{selectedSupplier?.padEnd(50, "\u2002")}</Descriptions.Item>
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
