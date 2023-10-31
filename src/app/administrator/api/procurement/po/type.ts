export type ParticularItem = {
    description: string,
    total: number,
    qty: number,
    unit: string,
    stock: string | null,
    price: number
}
export type QuotationItem = { id: string; particulars: ParticularItem[] }