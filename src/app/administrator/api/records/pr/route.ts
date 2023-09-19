import prisma from '@lib/db'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

//Add PR Record To Database
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const data = await req.json()
    } catch (err) {
        return new Response('', { status: 500 })
    }

    return NextResponse.json({ ok: true })
}