import { NextRequest, NextResponse } from 'next/server'


//mockdata
import { OutlineData } from './data.test'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const summaryType = searchParams.get('reqtype') as string

    if (summaryType === 'outline') {
        return NextResponse.json({ data: OutlineData })
    } else {
        return NextResponse.error()
    }
}