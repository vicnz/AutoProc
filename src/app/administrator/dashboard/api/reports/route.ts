import db from '@lib/db'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'
import { toListLimited } from '@lib/intl/list'

enum RangeTypes {
    WEEK = 'week',
    MONTH = 'month',
    QUARTER = 'quarter',
    YEAR = 'year'
}

//
export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams

    try {

        if (searchParams.has('type') && searchParams.has('endDate')) {
            const endDate = searchParams.get('endDate')
            const rangeType: RangeTypes = searchParams.get('type') as RangeTypes
            let result
            switch (rangeType) {
                case RangeTypes.WEEK:
                    result = await fetchReports(req, endDate as string, 7)
                    return NextResponse.json({ type: RangeTypes.WEEK, data: result })
                case RangeTypes.MONTH:
                    result = await fetchReports(req, endDate as string, 30)
                    return NextResponse.json({ type: RangeTypes.MONTH, data: result })
                case RangeTypes.QUARTER:
                    result = await fetchReports(req, endDate as string, 91)
                    return NextResponse.json({ type: RangeTypes.QUARTER, data: result })
                case RangeTypes.YEAR:
                    result = await fetchReports(req, endDate as string, 365)
                    return NextResponse.json({ type: RangeTypes.YEAR, data: result })
                default:
                    result = await fetchReports(req, endDate as string, 7)
                    return NextResponse.json({ type: RangeTypes.WEEK, data: result })
            }
        }
        return NextResponse.json({ empty: true })
    } catch (err) {
        return new Response("", { status: 500 })
    }
}


interface ReturnType {
    number: string;
    id: string;
    supplier: { id: string, name: string };
    destination: string | null;
    particulars: { total: number, description: string }[];
    pr: {
        reference: string;
        purpose: string;
    };
    date: string
}

const fetchReports = async (req: NextRequest, endDate: string, noOfDays: number) => {

    const result = await db.purchase_orders.findMany({
        select: {
            id: true,
            number: true,
            particulars: true,
            destination: true,
            supplier: true,
            date: true,
            pr: {
                select: {
                    purpose: true,
                    reference: true,

                }
            }
        },
        where: {
            // final: true, //!TOGGLE THIS TRUE LATER ON [SELECTING ONLY THE FINALIZED PURCHASE ORDER]
            isDeleted: false,
            //! select PO that are completed and finalized use -> updatedAt field
            date: {
                lte: dayjs(endDate).toISOString(),
                gte: dayjs(endDate).subtract(noOfDays, 'days').toISOString() //get 7 days worth of report
            }
        }
    })

    return await parseResult(result as any) || []
}

const parseResult = async (result: ReturnType[]) => {
    return new Promise((res, rej) => {
        const parse = result.map((item: ReturnType) => {
            return {
                key: item.id,
                id: item.id,
                number: item.number,
                supplier: item.supplier.name,
                destination: item.destination,
                purpose: item.pr.purpose.substring(0, 75),
                total: item.particulars.reduce((accumilator, currentValue) => {
                    return accumilator + currentValue.total
                }, 0),
                particulars: toListLimited(item.particulars.map(item => item.description), 3),
                date: item.date
            }
        })

        return res(parse)
    })
}