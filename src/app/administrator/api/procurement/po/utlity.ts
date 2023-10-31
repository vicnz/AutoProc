import { ParticularItem, QuotationItem } from "./type";

export const computePurchaseOrderSummary = async (quotation: QuotationItem[], bidder: string | null, particulars: ParticularItem[]) => {

    const getLowestBidderQuotation = quotation.filter(
        (item) => item.id === bidder
    );
    let renderedparticulars = getLowestBidderQuotation.length > 0 && getLowestBidderQuotation[0].particulars;

    renderedparticulars = particulars.map((item) => {
        const total = (particulars as any[])?.filter((quote) => quote.description === item.description)[0]?.total;
        return {
            description: item.description,
            qty: item.qty,
            unit: item.unit,
            stock: item.stock,
            price: total / item.qty, //!TOTAL is divided to quantity from the total computed amount from the abstract -> pre-computed entered total from abstract / item.quantity
            total,
        };
    });

    return renderedparticulars
}