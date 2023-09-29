import prisma from '@lib/db'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

//Get Function
import { VIEW, CREATE, UPDATE, SETFINAL } from './utils'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const getId = searchParams.get('_id')
        if (typeof getId === 'string') {
            const result = await VIEW(getId).catch(err => { throw new Error('GET ERROR') })
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
        const prId = searchParams.get('_id')
        if (typeof prId === 'string') {
            await CREATE(prId).catch(err => { throw new Error("CREATE ERROR") });
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

        //Check if RFQ Id is included in query
        if (typeof id === 'string') {

            //Set Request For Quotation as FINAL
            if (setFinal === 'true') {
                await SETFINAL(id).catch(err => { throw new Error("Something") })
                return NextResponse.json({ ok: true })
            }
            const body = await req.json()
            await UPDATE(body, id).catch(err => { throw new Error("Something Error") })
            return NextResponse.json({ ok: true })
        }
    } catch (err) {
        console.log(err)
        return new Response('', { status: 500 })
    }
}
