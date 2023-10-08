import db, { PrismaModels } from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

//GET PO -> /administrator/api/po?_id=[pr-id]
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prID = searchParams.get("_id") as string; //PR ID
        if (prID === null) throw new Error("Please Provide an ID");

        const abstract = await db.purchase_quotation_abstracts.findFirst({
            select: { final: true },
            where: { prId: prID },
        });

        const result = await db.purchase_orders.findFirst({
            select: {
                id: true,
                date: true,
                delivery: true,
                destination: true,
                duration: true,
                final: true,
                number: true,
                entity: true,
                particulars: true,
                supplier: true,
                payment: true,
                mode: true,
                term: true,
                released: true,
                pr: {
                    select: {
                        purpose: true,
                        number: true,
                        reference: true,
                        final: true,
                    },
                },
                abstract: {
                    select: {
                        final: true,
                        award: {
                            select: {
                                final: true
                            }
                        }
                    }
                }
            },
            where: {
                prId: prID,
            },
        });

        //TODO fix this, it suppose to send first if the documents are final
        if (((abstract?.final || false) === false)) {
            return NextResponse.json({ requiredFinal: true });
        }

        if (typeof result?.id === 'undefined') {
            return NextResponse.json({ empty: true });
        } else {
            return NextResponse.json({
                ...result,
                prNumber: result.pr.number,
                reference: result.pr.reference,
                prFinal: result.pr.final,
                purpose: result.pr.purpose,
                awardsFinal: (result.abstract.award)[0].final
            });
        }
    } catch (err) {
        console.log(`ERROR:PO:GET:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};

//CREATE PO -> /administrator/api/po?_id=[pr-id]
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prID = searchParams.get("_id") as string; //pr ID
        if (prID === null) throw new Error("No Provided PR ID");

        const pr = await db.purchase_requests.findFirstOrThrow({
            select: {
                particulars: true,
            },
            where: { id: prID },
        }); //throw an error if PR does not exists

        const body = await req.json();
        if (body === null || typeof body === "undefined")
            throw new Error("No Request Body Sent");

        //TODO validate if the cost used in the amount is based from the Computed Abstract
        const abstract = await db.purchase_quotation_abstracts.findFirstOrThrow({
            select: {
                id: true,
                lowestBidder: true,
                quotations: true,
            },
            where: { prId: prID },
        });

        const supplierInfo = await db.suppliers.findFirst({
            where: {
                id: { equals: abstract.lowestBidder as string },
            },
        });

        const getLowestBidderQuotation = (
            abstract.quotations as Array<{ id: string; particulars: any[] }>
        ).filter((item) => item.id === abstract.lowestBidder);
        let particulars =
            getLowestBidderQuotation.length > 0 &&
            getLowestBidderQuotation[0].particulars;

        particulars = (pr.particulars as any[]).map((item) => {
            const total = (particulars as any[])?.filter(
                (quote) => quote.description === item.description
            )[0]?.total;
            return {
                description: item.description,
                qty: item.qty,
                unit: item.unit,
                stock: item.stock,
                price: total / item.qty, //!TOTAL is divided to quantity from the total computed amount from the abstract -> pre-computed entered total from abstract / item.quantity
                total,
            };
        });

        const parsed = {
            number: body.number,
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

        console.log(parsed);
        await db.purchase_orders.create({
            data: { ...parsed },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERROR:PO:GET:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};


export const PUT = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const id = searchParams.get('_id') //document id
        if (id === null) throw new Error("Required ID")
        const body = await req.json()
        if (body === null || typeof body === 'undefined') throw new Error("Required Body")

        await db.purchase_orders.update({
            data: { ...body },
            where: { id: id }
        })

        return NextResponse.json({ ok: true })
    } catch (err) {
        console.log(`ERROR:PO:PUT:${req.url}`)
        console.log(err)
        return new Response("", { status: 500 })
    }
}


//BIT SIZE UPDATE /administrator/api/po?_id=[document-id]&_final=[true|false]
export const PATCH = async function (req: NextResponse) {
    const { searchParams } = new URL(req.url);
    try {
        const poId = searchParams.get("_id") as string; //document id
        const setFinal = searchParams.get("_final") as "true" | "false";

        if (setFinal === "true") {
            await db.purchase_orders.update({
                data: { final: true },
                where: {
                    id: poId,
                },
            });
            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ action: "none" });
    } catch (err) {
        console.log(`ERROR:PO:PATCH:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};