import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { VIEW } from '../rfq/utils'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const getId = searchParams.get('_id')
        if (typeof getId === 'string') {
            const result = await VIEW(getId)
            return NextResponse.json(result || {})
        }
    } catch (err) {
        return new Response('', { status: 500 })
    }
}