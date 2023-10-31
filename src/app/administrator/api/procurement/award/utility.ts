import type { QuotationType } from './type'
export const computeQuotation = async (quotation: QuotationType[]) => {
    const quotations = quotation.map((item) => {
        return {
            supplier: item.supplier,
            id: item.id,
            ...Object.fromEntries(
                Object.entries(
                    item.particulars.reduce((result: any, item, index) => {
                        result[`${item["description"]}`] = item.total; //!Removed Quantity -> Assuming the Price is already the computed amount of (unit-price * quantity)
                        return result;
                    }, {})
                )
            ),
            total: (item.particulars as Array<{ total: number }>).reduce(
                (accumulator, item) => {
                    return accumulator + item.total;
                },
                0
            ),
        };
    });

    return quotations;
}