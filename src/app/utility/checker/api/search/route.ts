import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    try {
        if (searchParams.has('q')) throw "No Query"
        const query = searchParams.get('q') as string

        const settings = await db.settings.findFirst({
            select: { value: true }, where: {
                name: 'search_limit'
            }
        })

        const result = await db.delivery.findMany({
            select: {
                id: true,
                po: {
                    select: {
                        id: true,
                        number: true
                    }
                }
            },
            where: {
                po: {
                    number: {
                        startsWith: query
                    }
                },
                final: false
            },
            take: Number(settings?.value) || 5
        })

        const parsed = result.map(item => {
            return {
                id: item.id,
                number: item.po.number
            }
        })

        return NextResponse.json({ data: parsed })
    } catch (err) {
        console.log(err)
        return new Response("", { status: 500 })
    }
}