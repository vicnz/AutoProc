import prisma from '@lib/db'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

//Get Function

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const getId = searchParams.get('_id')
        if (typeof getId === 'string') {

            const prFinal = await prisma.pr.findFirst({
                select: {
                    id: true,
                    final: true
                },
                where: {
                    id: getId
                }
            })
            const result = await prisma.price_quotations.findFirst({
                select: {
                    final: true,
                    id: true,
                    suppliers: true,
                    tracking: true,
                    prId: true,
                    date: true,
                    pr: {
                        select: {
                            final: true,
                            budget: true,
                            reference: true,
                            particulars: true
                        }
                    }
                },
                where: {
                    prId: getId
                }
            })
            return NextResponse.json({ result, final: [prFinal] } || {})
        }
    } catch (err) {
        return new Response('', { status: 500 })
    }
}

//Add NEW PR RECORD
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const prId = searchParams.get('_id')
        if (typeof prId === 'string') {
            await prisma.price_quotations.create({
                data: {
                    final: false,
                    suppliers: [],
                    tracking: [],
                    prId: prId
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
        const setFinal = searchParams.get('_reqtype')
        if (typeof id === 'string') {

            if (setFinal === 'true') {
                await prisma.price_quotations.update({
                    data: { final: true },
                    where: { id: id }
                })
                return NextResponse.json({ ok: true })
            }
            const body = await req.json()

            await prisma.price_quotations.update({
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
