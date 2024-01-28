'use server';

import db from '@lib/db'
import { revalidatePath } from 'next/cache';

type FormType = {
    number: string;
    obr: string;
    reference: string;
    userId: string;
    date: string;
    budget: number; //! TOBE REMOVED
    purpose: string;
    particulars: Array<{
        qty: number;
        unit: string;
        description: string;
        price: number
    }>,
}

export const submitPurchaseOrder = async (formdata: FormType) => {
    try {
        await db.purchase_requests.create({
            data: {
                ...formdata,
                tracking: [],
                //CREATE RECOMMENDED DOCUMENT TEMPLATE
                recomend: {
                    create: {
                        content: [],
                        title: "",
                        tracking: [],
                    },
                },
                //CREATE RFQ DOCUMENT TEMPLATE
                rfq: {
                    create: {
                        suppliers: [],
                        tracking: [],
                        ris: "",
                    },
                },
            },
        });
        revalidatePath('/administrator/procurements')
        revalidatePath('/administrator/procurement')
        return { ok: true }
    } catch (err) {
        return { error: true }
    }
}