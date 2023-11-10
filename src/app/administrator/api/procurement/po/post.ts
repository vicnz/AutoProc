import { NextRequest, NextResponse } from "next/server";
import db from '@lib/db'
import { computePurchaseOrderSummary } from './utlity'
import { ParticularItem, QuotationItem } from "./type";
import { logger } from "@logger";
import APIError from "@lib/server/api-error";

export const createNewPurchaseOrder = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    try {
        //*CLIENT SENT DATA
        const prID = searchParams.get("_id") as string; //pr ID
        if (typeof prID === "undefined" || prID === null || prID === "") throw new Error("No Provided PR ID");
        const body = await req.json();
        if (typeof body === "undefined" || body === null) throw new Error("No Request Body Sent");

        //* FETCH PURCHASE REQUEST INFORMATION [NUMBER, PARTICULARS]
        const pr = await db.purchase_requests.findFirstOrThrow({
            select: {
                number: true,
                particulars: true,
            },
            where: { id: prID },
        }); //throw an error if PR does not exists

        //TODO validate if the cost used in the amount is based from the Computed Abstract
        const abstract = await db.purchase_quotation_abstracts.findFirstOrThrow({
            select: {
                id: true,
                lowestBidder: true,
                quotations: true,
            },
            where: { prId: prID },
        });
        //FETCH SUPPLIER INFO
        const supplierInfo = await db.suppliers.findFirst({
            where: {
                id: { equals: abstract.lowestBidder as string },
            },
        });


        //compute particulars
        const particulars = await computePurchaseOrderSummary(
            abstract.quotations as QuotationItem[],
            abstract.lowestBidder,
            pr.particulars as ParticularItem[]
        );

        const parsed = {
            number: pr.number as string, //? needs fixing
            entity: body.entity,
            date: body.date,
            duration: body.duration,
            mode: body.mode,
            payment: body.payment,
            term: body.term,
            destination: body.destination,
            supplier: supplierInfo || {
                name: null,
                address: null,
                id: null,
                position: null,
                representative: null,
                tin: null,
            }, //get this from Abstract
            particulars: particulars, //generate this from Abstract
            abstractId: abstract.id, //get this from Abstract
            prId: prID,
            tracking: [],
            released: false,
        };

        await db.purchase_orders.create({
            data: { ...parsed },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERROR:PO:GET:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
}