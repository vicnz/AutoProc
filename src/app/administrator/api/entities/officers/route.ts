export const revalidate = 0;
import db from '@lib/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const getID = searchParams.get('_id')

        if (getID === null) {
            const result = await db.officers.findMany({
                where: {
                    isDeleted: false
                }
            })
            return NextResponse.json(result)
        } else {
            return NextResponse.json({}) //get a single office
        }
    } catch (err) {
        console.log(`ERROR:GET:OFFICE:${req.url}`)
        console.log(err)
        return new Response('', { status: 500 })
    }
}