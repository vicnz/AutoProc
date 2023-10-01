import db from '@lib/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async function (req: NextRequest) {
    try {
        const result = await db.suppliers.findMany({
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return NextResponse.json(result);
    } catch (err) {
        return new Response('', { status: 400 })
    }
}