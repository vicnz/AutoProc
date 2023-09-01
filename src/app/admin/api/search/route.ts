import { NextRequest, NextResponse } from "next/server"
import mockdata, { IPurchaseRequestPreview } from '../../../../../.tests/mockdata/pr'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    let query = searchParams.get('query')
    let collection = searchParams.get('collection')

    // return NextResponse.json({ data: mockdata })
    if (typeof query !== 'undefined' && query !== null) {
        const result = await searchItem(query)
        return NextResponse.json({ data: result })
    } else {
        return NextResponse.json({ error: true, data: [] })
    }

}


async function searchItem(query: string, collection?: string) {
    //this should be a proper sql queryj
    const list = mockdata.filter((item, idx) => {
        //we are just gonna search the 
        return item.number?.startsWith(query) || item.particulars.startsWith(query)
    })

    return list;
}