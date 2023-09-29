import db from '@lib/db'
import dayjs from 'dayjs'

type IParticulars = {
    qty: number,
    unit: string,
    description: string,
    stock_no: string,
    price: number
}

export const VIEW = async (id: string) => {
    const pr = await db.pr.findFirst({
        include: {
            enduser: {
                select: {
                    id: true,
                    fname: true,
                    mname: true,
                    lname: true,
                    suffix: true,
                    department: {
                        select: {
                            description: true,
                            sections: {
                                select: {
                                    description: true
                                }
                            }
                        }
                    }
                }
            }
        },
        where: {
            id
        }
    })

    if (pr !== null) {
        //compute total
        const particulars: IParticulars[] = (pr.particulars as IParticulars[])
        const particularsWithTotal = particulars.map((item, idx) => {
            const total = item.price * item.qty;
            return { ...item, key: idx, total }
        })
        //
        const response = {
            ...pr,
            enduser: `${pr.enduser?.fname}${pr.enduser?.mname ? " " + pr.enduser.mname.substring(0, 1) + "." : ''} ${pr.enduser?.lname}${pr.enduser?.suffix ? " " + pr.enduser?.suffix : ''}`,
            department: pr.enduser?.department?.description,
            section: (pr.enduser?.department?.sections as any).description || null,
            particulars: particularsWithTotal,
            date: dayjs(pr.date).toISOString(),
            enduserId: pr.enduserId
        }

        return response;
    } else {
        return null;
    }
}

type IClientPR = {
    // id autogenerated by prisma
    pr_no: string,
    date: string, //!note parse the `date` in client side since fetch() cannot send date objects in json
    particulars: IParticulars[],
    sai: string,
    obr: string,
    reference: string,
    budget: number,
    purpose: string
    enduserId: string,
}
//make sure that the clientside data is loaded -> NextRequest.json() 
export const CREATE = async (data: IClientPR) => {
    try {
        const parsed = {
            ...data,
            date: data.date, //!note parse date from clients since fetch does not support date objects
            tracking: [] //todo set default office get this from the enduser department or if admin
        }

        await db.pr.create({
            data: parsed
        })

        return true
    } catch (err) {
        return null
    }
}

export const UPDATE = async (data: IClientPR, prId: string) => {
    try {
        const parsed = {
            ...data,
        }

        await db.pr.update({
            data: { ...parsed },
            where: { id: prId }
        })

        return true
    } catch (err) {
        return null;
    }
}

export const SETFINAL = async (prId: string) => {
    try {
        await db.pr.update({
            data: { final: true },
            where: { id: prId }
        })
        return true
    } catch (err) {
        return null;
    }

}