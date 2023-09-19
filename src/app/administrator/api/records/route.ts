import { NextRequest, NextResponse } from "next/server";
import prisma from '@lib/db'

import MockData, { IPurchaseRequestPreview } from './data.test'


export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const page: number = Number.parseInt(searchParams.get('page') as string)
        let data = await filtered(MockData as any, page, 10)
        return NextResponse.json(data)

    } catch (err) {
        return NextResponse.error()
    }

}

//filter data
const filtered = (data: Array<IPurchaseRequestPreview>, page: number, count: number) => {
    const countNumber = page + count;
    return new Promise<IPurchaseRequestPreview[]>(
        (res, rej) => {
            let filter = data.filter((item, idx) => {
                if (item.key >= page && item.key <= (countNumber)) {
                    return item;
                }
            })
            return res(filter)
        }
    )

}