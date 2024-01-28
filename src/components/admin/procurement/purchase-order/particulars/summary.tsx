import { Table } from "antd";
import NumToWords from "@lib/client/num-to-words";
import { ToPeso } from "@lib/intl/currency";
const RenderSummary = (pageData: any[]) => {
    let count = pageData.length;

    const subTotal = pageData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.total;
    }, 0);

    const rowLength = Math.max(10 - count)
    return (
        <>

            {/* EXTRA FIELDS */}

            {
                (rowLength > 0) ?
                    (
                        <>

                            {new Array(rowLength).fill(0).map((item, idx) => {
                                return (
                                    <Table.Summary.Row key={idx + "row"}>
                                        {new Array(6).fill(0).map((item, idx) => {
                                            return <Table.Summary.Cell index={idx} key={idx + "cell"}></Table.Summary.Cell>;
                                        })}
                                    </Table.Summary.Row>
                                );
                            })}
                        </>
                    ) : null
            }
            {/* EXTRA FIELDS */}
            {/* SUMMARY ROW */}
            <Table.Summary.Row>
                <Table.Summary.Cell index={0} key={"1cell"}>
                    Total
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} key={"2cell"} colSpan={4}>
                    <span style={{ whiteSpace: "normal" }}>{NumToWords(subTotal).toUpperCase() + ` PESOS`}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} key={"6cell"}>
                    {ToPeso(subTotal)}
                </Table.Summary.Cell>
            </Table.Summary.Row>
            {/* SUMMARY ROW */}
        </>
    );
};

export default RenderSummary;
