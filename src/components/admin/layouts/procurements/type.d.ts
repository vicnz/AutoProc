//CONTEXT
declare interface ProcurementListContextType {
    data?: ResponseType[],
    isLoading: boolean,
    isValidating: boolean,
    error: any
}

//RESPONSE TYPE FROM SERVER
declare interface ResponseType {
    key: string;
    number: string | null;
    reference: string;
    id: string;
    purpose: string;
    particulars: string;
    enduser: string;
    enduserId: string | null;
    department: string | null;
    section: string | null;
}