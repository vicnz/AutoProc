/**
 * * FETCH TOP 5 SUPPLIERS
 */

import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
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
            }
        },
        orderBy: {
            selection: 'desc',
        },
        take: 5
    })

    return NextResponse.json({ data: topSuppliers || {} })
}