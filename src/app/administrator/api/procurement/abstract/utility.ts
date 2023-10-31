import type { QuotationItem, CreateQuotationItem } from './type'
export const parseQuotation = async (quotations: QuotationItem[]) => {

    const response = quotations.map((item) => {
        return {
            supplier: item.supplier,
            id: item.id,
            //Parse Abstract Quotations
            ...Object.fromEntries(
                Object.entries(
                    item.particulars.reduce((result: any, item, index) => {
                        //TODO create an alternative way to be used to identify the row
                        result[`${item["description"]}`] = item.total; //!Removed Quantity -> Assuming the Price is already the computed amount of (unit-price * quantity)
                        return result;
                    }, {})
                )
            ),
            //Compute ROW total
            total: (item.particulars as Array<{ total: number }>).reduce(
                (accumulator, item) => {
                    return accumulator + item.total;
                },
                0
            ),
        };
    });

    return response;
}

export const parseCreateQuotation = async (prop: CreateQuotationItem) => {
    const response = prop.suppliers?.map((item) => {
        return {
            id: item.id,
            supplier: item.name,
            particulars: prop.particulars?.map((item) => {
                return { description: item.description, total: 0.0 };
            }),
        };
    });

    return response;
}

export const computeLowestAmount = async (quotation: Array<{ id: string, total: number }>, bidder?: string | null) => {
    let bidderAmount = 0;
    if (bidder) {
        bidderAmount = quotation.filter((item: { id: string }) => item.id === bidder)[0].total;
    }
    return bidderAmount;
}