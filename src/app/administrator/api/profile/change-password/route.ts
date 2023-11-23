/**
 * UPDATE ADMIN PASSWORD
 */

import { updateAdminPassword } from '@lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        const body: { id: string, password: string } = await req.json()
        if (typeof body === 'undefined' || body === null) throw "No Body Provided"

        const result = await updateAdminPassword(body.id, body.password)
        if (!result) {
            return NextResponse.json({ error: true, message: "Failed To Updated Password" })
        } else {
            return NextResponse.json({ ok: true })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: true, message: 'Server Error' })
    }
}