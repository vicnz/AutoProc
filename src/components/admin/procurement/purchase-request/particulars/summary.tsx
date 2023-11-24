import { Table } from "antd";
import { ToPeso } from "@lib/intl/currency";

const RenderSummary = (pageData: any[]) => {
    let count = pageData.length;

    //COMPUTE THE TOTAL AMOUNT
    const subTotal = pageData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.total;
    }, 0);

    return (
        <>
            {/* EXTRA FIELDS */}
            {new Array(10 - count).fill(0).map((item, idx) => {
                return (
                    <Table.Summary.Row key={idx + "row"}>
                        {new Array(5).fill(0).map((item, idx) => {
                            return <Table.Summary.Cell index={idx} key={idx + "cell"}></Table.Summary.Cell>;
                        })}
                    </Table.Summary.Row>
                );
            })}
            {/* EXTRA FIELDS */}
            {/* SUMMARY ROW */}
            <Table.Summary.Row>
                <Table.Summary.Cell index={0} key={"1cell"}></Table.Summary.Cell>
                <Table.Summary.Cell index={1} key={"2cell"}></Table.Summary.Cell>
                <Table.Summary.Cell index={2} key={"3cell"}></Table.Summary.Cell>
                <Table.Summary.Cell index={3} key={"4cell"}>
                    Total
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} key={"5cell"}>
                    {ToPeso(subTotal)}
                </Table.Summary.Cell>
            </Table.Summary.Row>
            {/* SUMMARY ROW */}
        </>
    );
};

export default RenderSummary;
