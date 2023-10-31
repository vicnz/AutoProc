export type QuotationType = {
    supplier: string;
    id: string;
    particulars: Array<{
        total: number;
        description: string;
    }>;
}