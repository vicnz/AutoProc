import db from '@lib/db'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

type ReturnType = {
    month: number,
    count: number
}

export const GET = async (req: NextRequest) => {

    const searchParams = req.nextUrl.searchParams

    let currentYear: number | string = dayjs().get('year').toString()

    if (searchParams.has('year')) {
        currentYear = searchParams.get('year') as string
        const summary = await db.$queryRaw<ReturnType>`
            SELECT 
                type,
                COUNT(id) AS count
            FROM purchase_requests
            WHERE  EXTRACT(YEAR from date) = ${currentYear}
            GROUP BY
            type
        `
        const [mapped, types] = await parseResult(summary)
        return NextResponse.json({ data: mapped, types })
    } else {
        const summary = await db.$queryRaw<ReturnType>`
            SELECT 
                type,
                COUNT(id) AS count
            FROM purchase_requests
            WHERE EXTRACT(YEAR from date) = ${currentYear}
            GROUP BY
            type
        `
        const [mapped, types] = await parseResult(summary)
        return NextResponse.json({ data: mapped, types })
    }
    // const parser = Intl.DateTimeFormat('en', { month: 'long' })
}

async function parseResult(result: any) {
    const procType = [
        "SVP",
        "BIDDING",
        "REORDER",
        "DIRECT"
    ]
    const mappedData = procType.map(prType => {
        // Find the data for the current month
        const data = (result as any[]).find(d => d.type === prType);
        // If data for the current month exists, return it, otherwise return default data
        return data ? { ...data, count: parseInt(data.count) } : { type: prType, count: 0 };
    });

    return [mappedData, procType];
}