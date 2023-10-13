import db from '@lib/db'
import { sign } from '@/lib/jwt'

import { NextRequest, NextResponse } from 'next/server'

//GENERATE QR CODE
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        //Generate QR Value
        let prID = searchParams.get('_id') as string
        let expiration = searchParams.get('exrpAt') as string

        if (Number.parseInt(expiration) === Number.NaN) {
            throw 'Not A Number'
        }
        const prInfo = await db.purchase_requests.findFirstOrThrow({
            select: {
                id: true,
                reference: true,
                number: true
            },
            where: {
                id: prID
            }
        })
        const generateValue = sign(prInfo, { expiresIn: `${expiration || 7}d` })

        return NextResponse.json({ token: generateValue, payload: prInfo })
    } catch (err) {
        console.log(`ERROR:GENQR:GET:${req.url}`)
        console.log(err)
        return new Response('', { status: 500 })
    }
}