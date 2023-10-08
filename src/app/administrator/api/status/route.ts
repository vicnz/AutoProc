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

        const status = {
            documents: [
                { tracking: pr?.tracking || [], name: 'Purchase Request', final: pr?.final || false },
                { tracking: recommend?.tracking || [], name: 'Recommendation', final: recommend?.final || false },
                { tracking: rfq?.tracking || [], name: 'RFQ', final: rfq?.final || false },
                { tracking: abstract?.tracking || [], name: 'Abstract', final: abstract?.final || false },
                { tracking: awarding?.tracking || [], name: 'Awarding', final: awarding?.final || false },
                { tracking: po?.tracking || [], name: 'Purchase Order', final: po?.final || false },
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