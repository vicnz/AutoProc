import fullname from "@lib/client/fullname";
import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import { computeQuotation } from "./utility";
import type { QuotationType } from "./type";
import APIError from "@/lib/server/api-error";
import { logger } from "@logger";

//GET Award Information -> /administrator/api/award?_id=[pr-id]
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prID = searchParams.get("_id") as string; //pr ID
        if (typeof prID === "undefined" || prID === null || prID === "") throw new Error("No ID Provided");

        //! REMINDER: DO NOT USE `include` IN QUERIES
        const result = await db.purchase_awards.findFirst({
            include: {
                pr: {
                    select: {
                        budget: true,
                        number: true,
                        purpose: true,
                        reference: true,
                        particulars: true,
                        user: {
                            select: {
                                fname: true,
                                mname: true,
                                lname: true,
                                suffix: true,
                                department: {
                                    select: {
                                        description: true,
                                    },
                                },
                                section: {
                                    select: {
                                        description: true,
                                    },
                                },
                            },
                        },
                    },
                },
                abstract: {
                    select: {
                        final: true,
                        lowestBidder: true,
                        lowestAmount: true,
                        date: true,
                        quotations: true,
                        rfq: {
                            select: {
                                date: true,
                                suppliers: true,
                            },
                        },
                    },
                },
            },
            where: {
                prId: prID,
            },
        });

        if (result === null) {
            return NextResponse.json({ empty: true });
        } else {
            const ListFormatter = new Intl.ListFormat("en");
            //FETCH SUPPLIER INFORMATION
            const supplierInfo = await db.suppliers.findFirst({
                select: {
                    address: true,
                    representative: true,
                    position: true,
                    name: true,
                    tin: true,
                },
                where: {
                    id: result.abstract?.lowestBidder || "none",
                },
            });

            //parse quotation
            const quotations = await computeQuotation(result.abstract.quotations as QuotationType[]);

            //Parse Result
            const parsed = {
                id: result.id,
                number: result.pr.number,
                purpose: result.pr.purpose,
                reference: result.pr.reference,
                budget: result.pr.budget,
                enduser: {
                    name: fullname(
                        {
                            fname: result.pr.user?.fname,
                            mname: result.pr.user?.mname,
                            lname: result.pr.user?.lname,
                            suffix: result.pr.user?.suffix,
                        },
                        true
                    ),
                    department: result.pr.user?.department?.description,
                },
                particulars: ListFormatter.format(
                    (result.pr.particulars as Array<{ description: string }>).map((item) => item.description)
                ),
                rfqDate: result.abstract.rfq?.date, //Request for Quotation Date of Issuance
                abstractDate: result.abstract.date, //Abstract of Quotation Date of Issuance
                suppliers: result.abstract.rfq?.suppliers || [],
                supplier: supplierInfo || {
                    name: false,
                    address: false,
                    position: false,
                    tin: false,
                    representative: false,
                },
                final: result.final,
                abstractFinal: result.abstract.final,
                quotations,
                amount: result.abstract.lowestAmount,
            };

            return NextResponse.json(parsed);
        }
    } catch (err) {
        console.log(`ERROR:AWARD:GET:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
};

//BIT SIZE UPDATE -> /administrator/api/awards?_id=[document-id]&_final=[true|false]
export const PATCH = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const awardId = searchParams.get("_id") as string; //document id
        if (typeof awardId === "undefined" || awardId === null || awardId === "") throw new Error("No ID Provided");

        if (searchParams.get("_final") === "true") {
            await db.purchase_awards.update({
                data: { final: true },
                where: {
                    id: awardId,
                },
            });
            return NextResponse.json({ ok: true });
        }
    } catch (err) {
        console.log(`ERROR:AWARD:PATCH:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("", { status: 500 });
    }
};
