import db from '@lib/db'
import { NextRequest, NextResponse } from 'next/server'
export const revalidate = 0;
export const GET = async function (req: NextRequest) {
    try {
        const result = await db.units.findMany({
            where: { isDeleted: false }
        })
        return NextResponse.json(result)
    } catch (err) {
        console.log(`ERROR:UNITS:GET:${req.url}`)
        console.log(err)
        return new Response('', { status: 500 })
    }
}