import db from '@lib/db'
import dayjs from 'dayjs'

//TODO
export const VIEW = async function (prId: string) {
    const req_quotation = await db.price_quotations.findFirst({ select: { final: true, id: true }, where: { prId: prId } })
    const result = await db.abstract.findFirst({
        where: {
            prId
        }
    })

    if (req_quotation !== null) {

        const quotations = []
        const parsed = {
            ...result,

        }
        return { result: {}, rfqFinal: req_quotation.final };
    } else {
        return null
    }

}

export const CREATE = async function (prId: string) {
    const req_quotation = await db.price_quotations.findFirst({ include: { pr: { select: { particulars: true } } }, where: { prId } })

    if (req_quotation?.final) {
        const quotations = (req_quotation.pr.particulars as any[]).map(item => {
            const SupplierQuotation = (req_quotation.suppliers as any[]).map(supplier => {
                return { name: supplier, qty: item.qty, price: 0.00 }
            })

            const data = {
                description: item.description,
                qty: item.qty,
                quotations: SupplierQuotation
            }

            return data;
        })

        await db.abstract.create({
            data: {
                biddingPlace: 'Basco, Batanes',
                lowestAmount: 0.00,
                lowestBidder: null,
                tracking: [],
                date: dayjs(Date.now()).format('MM/DD/YYYY'),
                prId,
                quotations
            }
        })
        return true;
    } else {
        return null;
    }
}