import { NextRequest, NextResponse } from "next/server"

import mockdata from '../data.test'

//Get Purchase Request
export const GET = async function (req: NextRequest, { params }: { params: { id: string } }) {
    console.log(params.id)
    try {
        return NextResponse.json({ data: mockdata })
    } catch (err) {
        return NextResponse.error()
    }
}

//Update Purchase Request
export const POST = async function (req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json()
        console.log(body)
        return NextResponse.json({})
    } catch (err) {
        return NextResponse.json({}, { status: 500 })
    }
}
