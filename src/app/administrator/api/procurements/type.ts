export type ResponseType = {
    id: string;
    key: string;
    number: string | null;
    reference: string;
    purpose: string;
    particulars: string;
    enduser: string;
    enduserId: string | undefined;
    department: string | null | undefined;
    section: string | null | undefined;
    status: number;
}