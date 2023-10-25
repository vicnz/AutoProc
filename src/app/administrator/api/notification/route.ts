import db, { PrismaModels } from '@lib/db'
import { NextRequest, NextResponse } from 'next/server'
import APIError from '@/lib/api_error'
import dayjs from 'dayjs'
import { randomRange } from '@/lib/random'

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    try {
        const isAll = searchParams.get('all') as string
        const hourRange = searchParams.get('hour') as string || '1' //fetch notifications until this hour ex. [3] -> all notification in the past 3 hrs
        const hrs = dayjs().subtract(Number.parseInt(hourRange), 'hour').toISOString()
        if (typeof isAll !== undefined) {
            //fetch all notifications
            const result = await db.notifications.findMany({
                where: {
                    createdAt: {
                        gte: hrs
                    },
                    updatedAt: {
                        gte: hrs
                    },
                    resolved: false
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            if (result.length > 0) {
                const resultingmap = result.map(item => {
                    const parse: Pick<PrismaModels['notifications'], 'id' & 'title' & 'description' & 'level' & 'content' & 'source' & 'type'> = item
                    return parse;
                })
                return NextResponse.json(resultingmap)
            }
            return NextResponse.json([])
        }
        return NextResponse.json([])
    } catch (err) {
        console.log(`ERROR:GET:${req.url}`)
        console.log(err)
        if (err instanceof APIError) {
            console.log(err)
            return new Response("Client Error", { status: 500 })
        }
        return new Response("Server Error", { status: 500 })
    }
}

//TEST
export const POST = async function () {
    const result = await db.notifications.create({
        data: {
            content: [],
            title: `Random String ${randomRange(10, 100)}`,
            description: "Nothing In Particular",
            source: "notset",
        }
    })

    return NextResponse.json({ ok: true })
}