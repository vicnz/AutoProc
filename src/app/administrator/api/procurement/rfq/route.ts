import db, { PrismaModels } from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import APIERROR, { METHOD } from '@lib/server/api-error'
import type { IParticularItem } from './type'
import { parseParticulars } from './utility'
import { logger } from "@logger";

//GET RFQ -> /administrator/api/rfq?_id=[valid-pr-id]
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prId = searchParams.get("_id") as string; //PR ID
        if (typeof prId === 'undefined' || prId === null || prId === "") throw new Error("No ID Provided")
        //
        //!REMINDER: DO NOT USE `includes` in query
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
            const [total, particulars] = await parseParticulars(result.pr.particulars as IParticularItem[])
            const parsed = {
                id: result.id,
                ris: "", //TODO ask what is this?
                prId: result.prId,
                date: result.date,
                tracking: result.tracking,
                final: result.final,
                suppliers: result.suppliers,
                budget: result.pr.budget,
                reference: result.pr.reference,
                particulars: particulars,
                recommendFinal: result.pr.recomend[0].final,
                total: total
            };
            return NextResponse.json(parsed);
        } else {
            return NextResponse.json({ empty: true });
        }
    } catch (err) {
        console.log(`ERROR:RFQ:GET:${req.url}`);
        logger.error(err)
        if (err instanceof APIERROR) {
            return new Response(`${err.message}`, { status: 500 })
        }
        return new Response("Server Error", { status: 500 });
    }
};

//UPDATE RFQ /administrator/api/rfq?_id=[record-id]
export const PUT = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string; //Record ID
        if (typeof id === 'undefined' || id === null || id === "") throw new Error("No ID Provided")
        const data = await req.json(); //throw an error if body is not provided
        if (typeof data === 'undefined' || data === null) throw new Error("No Body Data Provided")

        await db.purchase_price_quotations.update({
            data: {
                ...data,
            },
            where: { id },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERROR:RFQ:PUT:${req.url}`);
        logger.error(err)
        if (err instanceof APIERROR) {
            return new Response(`${err.message}`, { status: 500 })
        }
        return new Response("Server Error", { status: 500 });
    }
};

//BIT SIZE UPDATE FOR RFQ -> /administrator/api/rfq?_id=[record-id]
export const PATCH = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);

    try {
        const rfqId = searchParams.get("_id") as string; //document id
        if (typeof rfqId === 'undefined' || rfqId === null || rfqId === "") throw new Error("No ID Provided")
        const setFinal = searchParams.get("_final") as "true" | "false";

        if (searchParams.get("_final") === "true") {

            //TODO make sure before marking document as final, there should be at least (1) supplier   
            let rfq = await db.purchase_price_quotations.findFirst({ select: { suppliers: true }, where: { id: rfqId } })
            if (rfq && (rfq.suppliers as any[]).length < 1) throw new APIERROR("Please Add At Least One Supplier", req.url, METHOD.PATCH, 'client')

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
        logger.error(err)
        if (err instanceof APIERROR) {
            return new Response(`${err.message}`, { status: 500 })
        }
        return new Response(`Server Error`, { status: 500 });
    }
};
