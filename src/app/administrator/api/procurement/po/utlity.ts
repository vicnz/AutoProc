import { ParticularItem, QuotationItem } from "./type";

export const computePurchaseOrderSummary = async (quotation: QuotationItem[], bidder: string | null, particulars: ParticularItem[]) => {

    const getLowestBidderQuotation = quotation.filter(
        (item) => item.id === bidder
    );
    let renderedparticulars = getLowestBidderQuotation.length > 0 && getLowestBidderQuotation[0].particulars || [];

    renderedparticulars = renderedparticulars?.map((item) => {
        //TODO
        const partItem = (particulars as any[])?.find((particularItem) => {
            return particularItem.description == item.description
        });
        //
        return {
            description: item.description,
            qty: partItem.qty,
            unit: partItem.unit,
            stock: partItem.stock,
            price: item.total / partItem.qty, //!TOTAL is divided to quantity from the total computed amount from the abstract -> pre-computed entered total from abstract / item.quantity
            total: item.total,
        };
    });

    return renderedparticulars
}