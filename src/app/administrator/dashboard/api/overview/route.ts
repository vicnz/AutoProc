/**
 * * FETCH OVERVIEW DATA
 * * TOTAL PRS (CURRENT YEAR)
 * * TOTAL COST (CURRENT YEAR)
 * * TOTAL ACTIVE USERS
 * * TOTAL ACTIVE SUPPLIERS
 */

import db from "@lib/db";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { computeTotal } from './utility'

export const GET = async (req: NextRequest) => {
    const day = dayjs()
    const range = {
        start: day.startOf('year').toISOString(),
        end: day.endOf('year').toISOString()
    }

    const totalUsers = await db.users.count(
        {
            where: {
                isDeleted: false,
                userType: {
                    in: ['CHECKER', 'TRACKER', "USER"]
                }
            }
        }
    )

    const totalProcurements = await db.purchase_requests.count(
        {
            where: {
                isDeleted: false,
                date: {
                    gt: range.start,
                    lt: range.end
                }
            }
        }
    )

    const totalSuppliers = await db.suppliers.count({
        where: {
            isDeleted: false,
        }
    })

    const costs = await db.purchase_orders.findMany({
        select: {
            particulars: true
        },
        where: {
            isDeleted: false,
            date: {
                gt: range.start,
                lt: range.end
            }
        }
    })


    const [users, procurements, suppliers, purchase_costs] = await Promise.all([totalUsers, totalProcurements, totalSuppliers, costs])
    const subtotal = await computeTotal(purchase_costs as any)
    return NextResponse.json({ users: { count: users, year: day.get('year') }, procurements: { count: procurements, year: day.get('year') }, suppliers: { count: suppliers, year: day.get('year') }, totalCosts: { count: subtotal, year: day.get('year') } })
}
