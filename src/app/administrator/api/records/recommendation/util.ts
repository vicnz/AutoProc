import db, { PrismaModels } from '@lib/db'

export const VIEW = async (prId: string) => {

    const pr = await db.pr.findFirst({
        select: {
            id: true, final: true, budget: true, particulars: true, pr_no: true, reference: true,
            enduser: {
                select: {
                    id: true,
                    fname: true,
                    mname: true,
                    lname: true,
                    suffix: true,
                    department: { select: { description: true, sections: { select: { description: true } } } }
                },
            }
        },
        where: { id: prId }
    })

    const recommendation = await db.recommendation.findFirst({
        select: {
            final: true,
            tracking: true,
            id: true,
            prId: true
        },
        where: {
            prId
        }
    })

    if (pr !== null) {

        let totalCost = 0;
        (pr.particulars as Array<{ qty: number, price: number }>).forEach((item) => {
            totalCost += item.price * item.qty;
        })

        const ListFormatter = new Intl.ListFormat('en')
        const formattedParticulars = (pr.particulars as any[]).map(item => item.description)


        const mutated = {
            ...recommendation,
            pr_no: pr.pr_no,
            reference: pr.reference,
            enduser: `${pr.enduser?.fname}${pr.enduser?.mname ? " " + pr.enduser.mname.substring(0, 1) + "." : ''} ${pr.enduser?.lname}${pr.enduser?.suffix ? " " + pr.enduser.suffix : ''}`,
            enduserId: pr?.enduser?.id,
            particulars: ListFormatter.format(formattedParticulars),
            department: pr.enduser?.department?.description,
            total: Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(totalCost),
            budget: Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(Number.parseFloat(pr?.budget + "")) //todo fix budget to double
        }

        return { result: mutated, exists: recommendation ? true : false } //*check if recommendation already exists
    } else {
        return null
    }
}

export const CREATE = async (prId: string) => {
    try {
        await db.recommendation.create({
            data: {
                final: false,
                tracking: [],
                prId
            }
        })
        return true;
    } catch (err) {
        return null;
    }
}