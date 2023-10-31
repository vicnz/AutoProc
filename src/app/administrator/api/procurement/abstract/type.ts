export type QuotationItem = {
    id: string;
    supplier: string;
    particulars: Array<{ total: number; description: string }>;
}

export type CreateQuotationItem = {
    particulars?: Array<{ qty: number; description: string }>,
    suppliers?: Array<{ id: string; name: string }>
}