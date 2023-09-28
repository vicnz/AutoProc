import prisma, { PrismaModels } from '@lib/db'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const getId = searchParams.get('_id') //PR ID
        if (typeof getId === 'string') {

            const result = await prisma.abstract.findFirst({
                select: {
                    id: true,
                    biddingPlace: true,
                    final: true,
                    quotations: true,
                    tracking: true,
                    lowestAmount: true,
                    lowestBidder: true,
                    pr: {
                        select: {
                            id: true,
                            enduser: {
                                select: {
                                    fname: true,
                                    mname: true,
                                    lname: true,
                                    department: { select: { description: true } }
                                }
                            },
                            particulars: true
                        }
                    },
                    price_quotation: {
                        select: {
                            suppliers: true
                        }
                    }
                },
                where: {
                    prId: getId
                }
            })

            const prFinal = await prisma.pr.findFirst({
                select: { id: true, final: true },
                where: { id: getId }
            })

            const quotationFinal = await prisma.price_quotations.findFirst({
                select: { id: true, final: true },
                where: { pr: { id: getId } }
            })

            return NextResponse.json({ result, final: [prFinal, quotationFinal || { final: false }] } || {})
        }
    } catch (err) {
        console.log(err)
        return new Response('', { status: 500 })
    }
}

//Add NEW PR RECORD
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const prId = searchParams.get('_id')
        if (typeof prId === 'string') {
            const rfq = await prisma.price_quotations.findFirst({
                select: {
                    id: true,
                    suppliers: true,
                    final: true,
                    pr: {
                        select: {
                            id: true,
                            pr_no: true,
                            particulars: true
                        }
                    }
                },
                where: {
                    prId: prId
                }
            })

            const quotations = (rfq?.suppliers as any[]).map(item => {
                return {
                    supplier: item.name,
                    id: item.id,
                    items: (rfq?.pr?.particulars as any[]).map(item => {
                        return { qty: item.qty, description: item.description, price: 0.00 }
                    })
                }
            })

            await prisma.abstract.create({
                data: {
                    quotations,
                    tracking: [],
                    prId: prId,
                    rfqId: rfq?.id,
                    final: false,
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
                await prisma.abstract.update({
                    data: { final: true },
                    where: { id }
                })

                return NextResponse.json({ ok: true })
            }

            const body = await req.json()
            await prisma.abstract.update({
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
