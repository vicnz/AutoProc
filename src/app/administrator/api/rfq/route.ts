import db, { PrismaModels } from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

//GET RFQ -> /administrator/api/rfq?_id=[valid-pr-id]
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prId = searchParams.get("_id") as string; //PR ID
        //
        const result = await db.purchase_price_quotations.findFirst({
            include: {
                pr: {
                    select: {
                        final: true,
                        budget: true,
                        reference: true,
                        particulars: true,
                        recomend: {
                            select: {
                                final: true,
                            },
                        },
                    },
                },
            },
            where: {
                prId,
            },
        });

        if (result) {
            const parsed = {
                id: result.id,
                ris: "", //TODO ask what is this?
                prId: result.prId,
                date: result.date,
                tracking: result.tracking,
                final: result.final,
                suppliers: result.suppliers,
                budget: Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP",
                }).format(result?.pr?.budget),
                reference: result.pr.reference,
                particulars: (
                    result.pr.particulars as Array<{
                        description: string;
                        qty: number;
                        price: number;
                        unit: string;
                    }>
                ).map((item, idx) => ({ ...item, key: idx + 1 })),
                recommendFinal: result.pr.recomend[0].final,
            };
            return NextResponse.json(parsed);
        } else {
            return NextResponse.json({ empty: true });
        }
    } catch (err) {
        console.log(`ERROR:RFQ:GET:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};

//UPDATE RFQ /administrator/api/rfq?_id=[record-id]
export const PUT = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string; //Record ID
        const data = await req.json(); //throw an error if body is not provided

        await db.purchase_price_quotations.update({
            data: {
                ...data, //!NOTE Parse Date on client side
            },
            where: { id },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERROR:RFQ:PUT:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};

//BIT SIZE UPDATE FOR RFQ -> /administrator/api/rfq?_id=[record-id]
export const PATCH = async function (req: NextResponse) {
    const { searchParams } = new URL(req.url);

    try {
        const rfqId = searchParams.get("_id") as string; //document id
        const setFinal = searchParams.get("_final") as "true" | "false";

        if (setFinal === "true") {

            //TODO make sure before marking document as final, there should be at least (1) supplier
            let rfq = await db.purchase_price_quotations.findFirst({ where: { id: rfqId } })
            if (rfq && (rfq.suppliers as any[]).length < 1) throw new Error("Please Select At Least One Supplier")

            await db.purchase_price_quotations.update({
                data: { final: true },
                where: {
                    id: rfqId,
                },
            });
            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ action: "none" });
    } catch (err) {
        console.log(`ERROR:RFQ:PATCH:${req.url}`);
        console.log(err);
        return new Response(``, { status: 500 });
    }
};
