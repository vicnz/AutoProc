/**
 * * GENERATE REPORTS
 * * PARAMS
 * * - START DATE
 * * - END DATE
 */

import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'
import { fetchReports } from './utility'

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams

    try {
        if (searchParams.has('startDate') && searchParams.has('endDate')) {
            const startDate = searchParams.get('startDate') as string //GET START DATE
            const endDate = searchParams.get('endDate') as string //GET END DATE

            const [result, subtotal] = await fetchReports(req, startDate, endDate) as any[]

            const meta = {
                days: dayjs(endDate).diff(startDate, 'days'),
                startDate: startDate,
                endDate: endDate,
                count: result.length,
                generated: dayjs().toISOString(),
                subTotal: subtotal,

            }
            return NextResponse.json({ meta, data: result })
        }
        return NextResponse.json({ empty: true })
    } catch (err) {
        return new Response("", { status: 500 })
    }
}