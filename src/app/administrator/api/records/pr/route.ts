import prisma from '@lib/db'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

//Get Function

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const getId = searchParams.get('_id')
        if (typeof getId === 'string') {
            const result = await prisma.pr.findFirst({
                include: {
                    enduser: {
                        select: {
                            id: true,
                            fname: true,
                            mname: true,
                            lname: true,
                            department: { select: { description: true } },
                            section: { select: { description: true } }
                        }
                    }
                },
                where: {
                    id: { equals: getId }
                }
            })
            return NextResponse.json(result)
        }
    } catch (err) {
        return new Response('', { status: 500 })
    }
}

//Add NEW PR RECORD
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const data = await req.json()
        await prisma.pr.create({
            data: { ...data, tracking: [] },
        })
        return NextResponse.json({ ok: true })
    } catch (err) {
        console.log(err)
        return new Response('', { status: 500 })
    }

}

//UPDATE PR INFORMATION
export const PUT = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const id = searchParams.get('_id')
        const isFinal = searchParams.get('_reqtype')
        if (typeof id === 'string') {

            if (isFinal === 'true') {

                await prisma.pr.update({
                    data: { final: true },
                    where: {
                        id
                    }
                })

                return NextResponse.json({ ok: true })
            }

            const body = await req.json()
            await prisma.pr.update({
                data: { ...body },
                where: { id },
            })
            return NextResponse.json({ ok: true })

        }

    } catch (err) {
        console.log(err)
        return new Response('', { status: 500 })
    }
}
