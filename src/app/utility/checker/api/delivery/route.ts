import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import { computeDelivery, ParcelItem } from './utility'
import { notFound } from "next/navigation";

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    try {
        if (!searchParams.has('id')) notFound()
        const id = searchParams.get("id") as string; //PR ID
        if (typeof id === "undefined" || id === null || id === "") throw new Error("ID Not Provided");


        const delivery = await db.delivery.findFirst({
            select: {
                id: true,
                startDate: true,
                endDate: true,
                parcels: true,
                final: true,
                po: {
                    select: {
                        supplier: true,
                        number: true,
                    }
                }
            },
            where: {
                id
            }
        })

        if (!delivery) notFound()
        const [status, progress] = await computeDelivery(delivery.parcels as ParcelItem[], delivery.endDate)
        const parsed = {
            id: delivery.id,
            number: delivery.po.number,
            supplier: delivery.po.supplier,
            startDate: delivery.startDate,
            endDate: delivery.endDate,
            parcels: delivery.parcels,
            final: delivery.final,
            completed: false,
            progress: progress,
            status: status,
        }

        return NextResponse.json(parsed)
    } catch (err) {
        console.log(`ERROR:DELIVERY:GET:${req.url}`);
        return new Response("", { status: 500 });
    }
}