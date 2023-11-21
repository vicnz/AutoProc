/**
 * * FETCH TOP 5 SUPPLIERS
 */

import db from "@lib/db";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const currentYear = dayjs() //GET CURRENT YEAR

    const range = {
        start: currentYear.startOf('year').toISOString(),
        end: currentYear.endOf('year').toISOString()
    }

    //FETCH
    const topSuppliers = await db.supplier_rating.findMany({
        select: {
            delays: true,
            extends: true,
            selection: true,
            onTime: true,
            supplier: {
                select: {
                    id: true,
                    name: true,
                    tin: true
                }
            }
        },
        where: {
            isDeleted: false,
            supplier: {
                isDeleted: false
            },
            updatedAt: {
                gt: range.start,
                lte: range.end
            }
        },
        orderBy: {
            selection: 'desc',
        },
        take: 5
    })

    return NextResponse.json({ data: topSuppliers || {} })
}