import { Table } from "antd";

const renderSummary = (pageData: any[]) => {
    let count = pageData.length;
    return (
        <>
            {new Array(10 - count).fill(0).map((item, idx) => {
                return (
                    <Table.Summary.Row key={idx + "-row"}>
                        {new Array(6).fill(0).map((item, idx) => {
                            return <Table.Summary.Cell index={idx} key={idx + "-cell-spacer"}></Table.Summary.Cell>;
                        })}
                    </Table.Summary.Row>
                );
            })}
            <Table.Summary.Row>
                <Table.Summary.Cell index={0} key={"1-cell"}></Table.Summary.Cell>
                <Table.Summary.Cell index={1} key={"2-cell"}></Table.Summary.Cell>
                <Table.Summary.Cell index={2} key={"3-cell"}></Table.Summary.Cell>
                <Table.Summary.Cell index={3} key={"4-cell"}></Table.Summary.Cell>
                <Table.Summary.Cell index={4} key={"5-cell"}>
                    Total
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} key={"6-cell"}></Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
};

export default renderSummary;
