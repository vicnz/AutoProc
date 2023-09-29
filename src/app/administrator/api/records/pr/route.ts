import prisma from '@lib/db'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

//Get Function
import { VIEW, UPDATE, SETFINAL, CREATE } from './util'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const getId = searchParams.get('_id')

        if (typeof getId === 'string') {
            const result = await VIEW(getId)
            return NextResponse.json(result)
        }
    } catch (err) {
        return new Response('', { status: 500 })
    }
}

//Add NEW PR RECORD
export const POST = async function (req: NextRequest) {

    try {
        const data = await req.json()
        CREATE(data).catch(err => { throw new Error("PR Creation Error") })
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
                SETFINAL(id).catch(err => { throw new Error('Pr Finalization Error') })
                return NextResponse.json({ ok: true })
            }

            const body = await req.json()
            UPDATE(body, id).catch(err => { throw new Error('PR Update Error') })
            return NextResponse.json({ ok: true })

        }

    } catch (err) {
        console.log(err)
        return new Response('', { status: 500 })
    }
}
