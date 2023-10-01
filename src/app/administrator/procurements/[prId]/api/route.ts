import db from '@lib/db'
import { NextRequest, NextResponse } from 'next/server'

enum DocumentType {
    PR = 'purchase_request',
    RECOMMEND = 'recommendation',
    RFQ = 'request_price_for_quotation',
    ABSTRACT = 'abstract_of_quotation',
    AWARDING = 'bid_awarding',
    PO = 'purchase_order',
    DELIVERY = 'delivery_of_goods'
}

//Utils
import { CREATE, SETFINAL, UPDATE, VIEW } from '@controllers/admin/purchase-request'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const DocType: DocumentType = searchParams.get('doctype') as DocumentType
        const prId = searchParams.get('_id')
        let result;
        switch (DocType) {
            case DocumentType.PR:
                result = await VIEW(prId as string)
                return NextResponse.json(result);
            case DocumentType.RECOMMEND:
                return;
            case DocumentType.RFQ:
                return;
            case DocumentType.ABSTRACT:
                return;
            case DocumentType.AWARDING:
                return;
            case DocumentType.PO:
                return;
            case DocumentType.DELIVERY:
                return;
            default:
                result = await VIEW(prId as string)
                return NextResponse.json(result);
            //return pr
        }
    } catch (err) {
        console.log(err)
        return new Response('', { status: 400 })
    }
}

export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const DocType: DocumentType = searchParams.get('doctype') as DocumentType
        const prId = searchParams.get('_id')
        let result;
        let body = await req.json()
        switch (DocType) {
            case DocumentType.PR:
                result = await CREATE(body)
                console.log(result)
                return NextResponse.json(result);
            case DocumentType.RECOMMEND:
                return;
            case DocumentType.RFQ:
                return;
            case DocumentType.ABSTRACT:
                return;
            case DocumentType.AWARDING:
                return;
            case DocumentType.PO:
                return;
            case DocumentType.DELIVERY:
                return;
        }
    } catch (err) {
        console.log(err)
        return new Response('', { status: 400 })
    }
}


export const PUT = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const DocType: DocumentType = searchParams.get('doctype') as DocumentType
        const docId = searchParams.get('_id')
        let result;
        let body = await req.json()
        switch (DocType) {
            case DocumentType.PR:
                result = await UPDATE(body, docId as string)
                return NextResponse.json(result);
            case DocumentType.RECOMMEND:
                return;
            case DocumentType.RFQ:
                return;
            case DocumentType.ABSTRACT:
                return;
            case DocumentType.AWARDING:
                return;
            case DocumentType.PO:
                return;
            case DocumentType.DELIVERY:
                return;
            default:
                result = await UPDATE(body, docId as string)
                return NextResponse.json(result);
            //return pr
        }
    } catch (err) {
        console.log(err)
        return new Response('', { status: 400 })
    }
}

export const PATCH = async function (req: NextRequest) {

}