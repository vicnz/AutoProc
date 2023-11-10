import type { QuotationType } from './type'
export const computeQuotation = async (quotation: QuotationType[]) => {
    const quotations = quotation.map((item) => {
        //compute total
        const total = (item.particulars as Array<{ total: number }>).reduce(
            (accumulator, item) => {
                return accumulator + item.total;
            },
            0
        )
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
            total: total
        };
    });

    return quotations
}

export const computeParticulars = async (particulars: Array<{ price: number, qty: number }>) => {
    let subTotal = 0;
    const computed = particulars.map(item => {
        const itemTotal = item.price * item.qty
        subTotal += itemTotal
        return {
            ...item,
            total: itemTotal
        }
    })

    return [computed, subTotal]
}