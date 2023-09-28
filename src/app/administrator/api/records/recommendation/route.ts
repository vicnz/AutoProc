import prisma from '@lib/db'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

//Get Function

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const getId = searchParams.get('_id')
        if (typeof getId === 'string') {

            //final pr
            const prFinal = await prisma.pr.findFirst({
                select: {
                    id: true,
                    final: true
                },
                where: {
                    id: getId
                }
            })


            const result = await prisma.recommendation.findFirst({
                select: {
                    final: true,
                    id: true,
                    prId: true,
                    pr: {
                        select: {
                            final: true,
                            budget: true,
                            reference: true,
                            pr_no: true,
                            id: true,
                            particulars: true,
                            enduser: {
                                select: {
                                    id: true,
                                    fname: true,
                                    mname: true,
                                    lname: true,
                                    department: {
                                        select: {
                                            description: true
                                        }
                                    }
                                }
                            }
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
            await prisma.recommendation.create({
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
        const id = searchParams.get('_id') //record id, not pr id
        const setFinal = searchParams.get('_reqtype')
        if (typeof id === 'string') {

            if (setFinal === 'true') {
                await prisma.recommendation.update({
                    data: { final: true },
                    where: { id }
                })

                return NextResponse.json({ ok: true })
            }

            const body = await req.json()
            await prisma.recommendation.update({
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
