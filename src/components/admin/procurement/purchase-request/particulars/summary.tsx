import { Table } from "antd";

const RenderSummary = (pageData: any[]) => {
    let totalCost = 0;
    let count = pageData.length

    //COMPUTE THE TOTAL AMOUNT
    pageData.forEach((item: any) => {
        totalCost += item.total
    })

    //CONVERT TOTAL NUMBER TO CURRENCY
    const total = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
    }).format(totalCost)

    return (
        <>
            {/* EXTRA FIELDS */}
            {
                new Array(8 - count).fill(0).map((item, idx) => {
                    return (
                        <Table.Summary.Row key={idx + 'row'}>
                            {
                                new Array(6).fill(0).map((item, idx) => {
                                    return (
                                        <Table.Summary.Cell index={idx} key={idx + 'cell'}></Table.Summary.Cell>
                                    )
                                })
                            }
                        </Table.Summary.Row>
                    )
                })
            }
            {/* EXTRA FIELDS */}
            {/* SUMMARY ROW */}
            <Table.Summary.Row>
                <Table.Summary.Cell index={0} key={'1cell'}></Table.Summary.Cell>
                <Table.Summary.Cell index={1} key={'2cell'}></Table.Summary.Cell>
                <Table.Summary.Cell index={2} key={'3cell'}></Table.Summary.Cell>
                <Table.Summary.Cell index={3} key={'4cell'}></Table.Summary.Cell>
                <Table.Summary.Cell index={4} key={'5cell'}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={5} key={'6cell'}>{total}</Table.Summary.Cell>
            </Table.Summary.Row>
            {/* SUMMARY ROW */}
        </>
    )
}

export default RenderSummary;