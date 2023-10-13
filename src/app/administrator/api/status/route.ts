import db from '@lib/db'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    try {
        const pr_id = searchParams.get('_pr') as string

        const pr = await db.purchase_requests.findUnique({
            select: { final: true, tracking: true },
            where: { id: pr_id },
        })

        const recommend = await db.purchase_recommendations.findUnique({
            select: { final: true, tracking: true },
            where: { prId: pr_id }
        })

        const rfq = await db.purchase_price_quotations.findUnique({
            select: { final: true, tracking: true },
            where: { prId: pr_id }
        })

        const abstract = await db.purchase_quotation_abstracts.findUnique({
            select: { final: true, tracking: true },
            where: { prId: pr_id }
        })

        const awarding = await db.purchase_awards.findUnique({
            select: { final: true, tracking: true },
            where: { prId: pr_id }
        })

        const po = await db.purchase_orders.findUnique({
            select: { final: true, tracking: true },
            where: { prId: pr_id }
        })

        const resolved = await Promise.all([pr, recommend, rfq, abstract, awarding, po])

        const status = {
            documents: [
                { name: 'Purchase Request', ...resolved[0] },
                { name: 'Recommendation', ...resolved[1] },
                { name: 'RFQ', ...resolved[2] },
                { name: 'Abstract', ...resolved[3] },
                { name: 'Awarding', ...resolved[4] },
                { name: 'Purchase Order', ...resolved[5] },
            ],
            delivery: {}
        }

        return NextResponse.json(status)
    } catch (err) {
        console.log(`ERR:STATUS:GET:${req.url}`)
        console.log(err)
        return new Response('', { status: 500 })
    }
}