import db from "@lib/db";
import { toListLimited } from "@lib/intl/list";
import dayjs from "dayjs";
import { NextRequest } from "next/server";

export interface ReturnType {
    number: string;
    id: string;
    supplier: { id: string, name: string };
    destination: string | null;
    particulars: { total: number, description: string }[];
    createdAt: string,
    pr: {
        reference: string;
        purpose: string;
        type: string;
    };
    final: boolean,
    released: boolean,
    date: string
}

export const fetchReports = async (req: NextRequest, startDate: string, endDate: string) => {

    const result = await db.purchase_orders.findMany({
        select: {
            id: true,
            number: true,
            particulars: true,
            destination: true,
            supplier: true,
            date: true,
            createdAt: true,
            final: true,
            released: true,
            pr: {
                select: {
                    purpose: true,
                    reference: true,
                    type: true
                }
            }
        },
        where: {
            // final: true, //!TOGGLE THIS TRUE LATER ON [SELECTING ONLY THE FINALIZED PURCHASE ORDER]
            isDeleted: false,
            //! select PO that are completed and finalized use -> updatedAt field
            date: {
                gte: dayjs(startDate).toISOString(), //get 7 days worth of report
                lte: dayjs(endDate).toISOString(),
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return await parseResult(result as any) || []
}

//COMPUTE SUBTOTAL AND CONVERTION OF VALUES
const parseResult = async (result: ReturnType[]) => {
    return new Promise((res, rej) => {
        let subTotal = 0;
        const parse = result.map((item: ReturnType) => {
            const total = item.particulars.reduce((accumilator, currentValue) => {
                return accumilator + currentValue.total
            }, 0)

            subTotal += total;

            return {
                key: item.id,
                id: item.id,
                number: item.number,
                supplier: item.supplier.name,
                destination: item.destination,
                purpose: item.pr.purpose.substring(0, 75),
                total: total,
                particulars: toListLimited(item.particulars.map(item => item.description), 3),
                date: item.createdAt,
                type: item.pr.type,
                final: item.final,
                released: item.released
            }
        })

        return res([parse, subTotal])
    })
}