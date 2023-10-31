export type ParcelItem = {
    verified: any;
    qty: number;
    completed: boolean;
};

export type ParcelViewItem = {
    completed: boolean;
    description: string;
    price: number;
    total: number;
    qty: number;
    remarks: string | null; //checker remarks and stuff
    verified: {
        count: number; //*check the delivered amount
        quality: boolean; //*check if the product quality is satisfying
        aligned: boolean; //*if the presented delivered item is aligned with the PR presented
    };
};
