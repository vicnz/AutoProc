import mockdata, { IPurchaseRequestPreview } from '../../../../../.tests/mockdata/pr'

import { NextRequest } from 'next/server'
import { NextResponse, } from 'next/server'

//#SAMPLE URL http://localhost:3000/admin/api/pr?page=1&count=5
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    let page = searchParams.get('page')
    let count = searchParams.get('count')

    return NextResponse.json({ data: mockdata })
}

export async function POST(request: NextRequest) {
    return NextResponse.json({})
}
