import { PrismaModels } from '@lib/db'

export type IParticular = {
    qty: number,
    unit: string,
    description: string,
    stock_no: string,
    price: number,
    total: number
}

export type IAPIReturnType = {
    id: string,
    pr_no?: string,
    sai?: string,
    obr?: string,
    date: string,
    reference: string,
    final: boolean,
    purpose: string,
    budget: number,
    enduser: string,
    department: string,
    section?: string,
    enduserId?: string
    tracking: any[],
    particulars: IParticular[]
}
