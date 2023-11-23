import db from '@lib/db'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

type ReturnType = {
    month: number,
    count: number
}

export const GET = async (req: NextRequest) => {

    const searchParams = req.nextUrl.searchParams
    const endMonthDate = dayjs().endOf('year').toISOString() //current active month
    const startMonthDate = dayjs().startOf('year').toISOString() //current active month

    let currentYear: number | string = dayjs().get('year').toString()

    if (searchParams.has('year')) {
        currentYear = searchParams.get('year') as string
        const summary = await db.$queryRaw<ReturnType>`
            SELECT 
                MONTH(date) AS month,
                COUNT(id) AS count
            FROM purchase_requests
            WHERE  YEAR(date) = ${currentYear}
            GROUP BY
            YEAR(date),
            MONTH(date)
        `
        const mapped = await parseResult(summary)
        return NextResponse.json({ data: mapped })
    } else {
        const summary = await db.$queryRaw<ReturnType>`
            SELECT 
                MONTH(date) AS month,
                COUNT(id) AS count
            FROM purchase_requests
            WHERE EXTRACT(YEAR from date) = ${currentYear}
            GROUP BY
            YEAR(date),
            MONTH(date)
        `
        const mapped = await parseResult(summary)
        return NextResponse.json({ data: mapped })
    }
    // const parser = Intl.DateTimeFormat('en', { month: 'long' })
}

async function parseResult(result: any) {
    const months = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, count: 0 }))
    const mappedData = months.map(month => {
        // Find the data for the current month
        const data = (result as any[]).find(d => d.month === month.month);
        // If data for the current month exists, return it, otherwise return default data
        return data ? { ...data, count: parseInt(data.count) } : { month: month.month, count: 0 };
    });

    return mappedData;
}