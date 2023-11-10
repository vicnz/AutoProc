import { NextRequest, NextResponse } from "next/server";
import db from '@lib/db'
import APIError from "@lib/server/api-error";
import { logger } from "@logger";

export const getPurchaseOrderItem = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams; //SEARCH PARAMS
    try {
        const prID = searchParams.get("_id") as string; //PR ID
        if (typeof prID === "undefined" || prID === null || prID === "") throw new Error("Please Provide an ID");

        //* FETCH ABSTRACT [IS FINAL]
        const abstract = await db.purchase_quotation_abstracts.findFirst({
            select: { final: true, award: { select: { final: true } } },
            where: { prId: prID },
        });

        //* SEND [REQUIRED] WHEN ABSTRACT IS NOT YET SET TO [FINAL]
        if (!(abstract?.final && abstract?.award[0].final)) {
            return NextResponse.json({ requiredFinal: true });
        } else {
            //* FETCH PURCHASE ORDER INFORMATION
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
                                    final: true,
                                },
                            },
                        },
                    },
                },
                where: {
                    prId: prID, //*PR ID
                },
            });

            //* SEND [EMPTY] WHEN THERE IS NO PO YET
            if (typeof result?.id === "undefined") {
                return NextResponse.json({ empty: true });
            } else {
                //* SEND TO CLIENT
                return NextResponse.json({
                    ...result,
                    prNumber: result.pr.number,
                    reference: result.pr.reference,
                    prFinal: result.pr.final,
                    purpose: result.pr.purpose,
                    awardsFinal: abstract?.final
                });
            }
        }

    } catch (err) {
        console.log(`ERROR:PO:GET:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
}