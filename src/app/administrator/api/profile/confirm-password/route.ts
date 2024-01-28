export const revalidate = 0;
/**
 * VALIDATE ADMINISTRATOR PASSWORD
 */

import { validateAdmin, confirmPassword } from '@lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    try {
        const body: { id: string, password: string } = await req.json()
        if (typeof body === 'undefined' || body === null) throw "No Body Provided"

        const result = await confirmPassword(body.id, body.password)
        if (!result) {
            return NextResponse.json({ error: true, message: "Password Does Not Match" })
        } else {
            return NextResponse.json({ ok: true })
        }
    } catch (err) {
        return NextResponse.json({ error: true, message: 'Server Error' })
    }
}