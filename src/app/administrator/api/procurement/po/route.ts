import APIError from "@lib/server/api-error";
import db, { PrismaModels } from "@lib/db";
import { logger } from "@logger";
import { NextRequest, NextResponse } from "next/server";
import { computePurchaseOrderSummary } from "./utlity";
import type { ParticularItem, QuotationItem } from "./type";
import { getPurchaseOrderItem } from './get'
import { createNewPurchaseOrder } from './post'

//GET PO -> /administrator/api/po?_id=[pr-id]
export const GET = async function (req: NextRequest) {
    return await getPurchaseOrderItem(req)
};

//CREATE PO -> /administrator/api/po?_id=[pr-id]
export const POST = async function (req: NextRequest) {
    return await createNewPurchaseOrder(req)
};

/**
 * UPDATE RECORDS
 */
export const PUT = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id"); //document id
        if (typeof id === "undefined" || id === null || id === "") throw new Error("Required ID");
        const body = await req.json();
        if (typeof body === "undefined" || body === null) throw new Error("Required Body");

        await db.purchase_orders.update({
            data: { ...body },
            where: { id: id },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERROR:PO:PUT:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
};

//BIT SIZE UPDATE /administrator/api/po?_id=[document-id]&_final=[true|false]
export const PATCH = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const poId = searchParams.get("_id") as string; //document id
        if (typeof poId === "undefined" || poId === null || poId === "") throw new Error("No ID Provided");

        if (searchParams.get("_final") === "true") {
            await db.purchase_orders.update({
                data: { final: true },
                where: {
                    id: poId,
                },
            });
            return NextResponse.json({ ok: true });
        }
    } catch (err) {
        console.log(`ERROR:PO:PATCH:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
};
