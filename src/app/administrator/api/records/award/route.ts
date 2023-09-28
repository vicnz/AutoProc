import prisma from '@lib/db'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

//Get Function

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const getId = searchParams.get('_id')
        if (typeof getId === 'string') {

            const abstractFinal = await prisma.abstract.findFirst({
                select: { id: true, final: true },
                where: { prId: getId }
            })
            const result = await prisma.awards.findFirst({
                include: {
                    abstract: {
                        include: {
                            price_quotation: true,
                        }
                    },
                    pr: {
                        include: {
                            request_for_quoation: {
                                select: {
                                    suppliers: true
                                }
                            }
                        }
                    },
                },
                where: {
                    prId: getId
                }
            })
            return NextResponse.json({ result, final: [abstractFinal || { final: false }] } || {})
        }
    } catch (err) {
        return new Response('', { status: 500 })
    }
}

//Add NEW PR RECORD
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    //TODO create only one Document for a Single PR Document
    try {
        const prId = searchParams.get('_id')
        if (typeof prId === 'string') {
            await prisma.awards.create({
                data: {
                    final: false,
                    tracking: [],
                    prId: prId,
                }
            })
            return NextResponse.json({ ok: true })
        }
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
        if (typeof id === 'string') {

            const body = await req.json()
            const response = await prisma.pr.update({
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
