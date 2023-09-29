import prisma from '@lib/db'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

//Get Function
import { VIEW, CREATE } from './util'

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

//Add NEW PR RECORD
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const prId = searchParams.get('_id') //pr id
        if (typeof prId === 'string') {
            CREATE(prId).catch(err => { throw new Error("ADD NEW ERROR") })
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
