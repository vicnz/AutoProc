import db from '@lib/db'

export const VIEW = async (prId: string) => {
    const pr = await db.pr.findFirst({
        where: {
            id: prId
        }
    })

    const price_quotation = await db.price_quotations.findUnique({
        include: {
            pr: {
                select: {
                    final: true,
                    budget: true,
                    reference: true,
                    particulars: true
                }
            }
        },
        where: {
            prId
        }
    })

    if (pr !== null) {
        const parsed = {
            ...price_quotation,
            budget: price_quotation?.pr.budget,
            reference: price_quotation?.pr.reference,
            particulars: price_quotation?.pr.particulars,
            prFinal: price_quotation?.pr.final
        }
        return { result: parsed, exists: price_quotation ? true : false }
    }
    else {
        return null;
    }

}

export const CREATE = async (prId: string) => {
    try {
        await db.price_quotations.create({
            data: {
                final: false,
                suppliers: [],
                tracking: [],
                prId
            }
        })
        return true;
    } catch (err) {
        return null;
    }
}

export const UPDATE = async (data: any, reqId: string) => {
    try {
        await db.price_quotations.update({
            data: {
                ...data
            },
            where: {
                id: reqId
            }
        })
        return true;
    } catch (err) {
        return null;
    }
}

export const SETFINAL = async (id: string) => {
    try {
        await db.price_quotations.update({ data: { final: true }, where: { id } })
        return true;
    } catch (err) {
        return null;
    }
}