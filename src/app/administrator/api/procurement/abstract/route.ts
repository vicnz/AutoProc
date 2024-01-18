import fullname from "@lib/client/fullname";
import db, { PrismaModels } from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import { parseCreateQuotation, computeLowestAmount, calculateQuotationsNew, parseQuotation } from "./utility";
import type { CreateQuotationItem, QuotationItem } from "./type";
import { logger } from "@logger";
import APIError, { METHOD } from "@lib/server/api-error";
//types


//GET ABSTRACT QUOTATIONS -> /administrator/api/abstract?_id=[valid-pr-id]
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prID = searchParams.get("_id") as string; //PR ID
        if (typeof prID === "undefined" || prID === null || prID === "") throw new Error("Please Provide an ID");

        //check if PR Exists and Is Final
        const pr = await db.purchase_requests.findFirst({
            select: { final: true },
            where: { id: prID },
        });

        //check if RFQ Exists and Is Final
        const rfq = await db.purchase_price_quotations.findFirst({
            select: { final: true },
            where: { prId: prID },
        });

        let isDocumentFinal = await Promise.all([pr?.final || false, rfq?.final || false]);

        //!NOTE: making sure the PR and RFQ are final since the data in the ABSTRACT is static,
        //!\ any changes done in the PR or RFQ will not cascade into the abstract record
        //!\ we are making sure that modification is not allowed to prevent inaccurate information

        if (isDocumentFinal.every((item) => item === true)) {
            //fetch abstract
            //! REMINDER: DO NOT USE `includes` IN QUERIES
            const result = await db.purchase_quotation_abstracts.findFirst({
                include: {
                    pr: {
                        select: {
                            user: {
                                select: {
                                    id: true,
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
                            particulars: true,
                            budget: true,
                            reference: true,
                        },
                    },
                    rfq: {
                        select: {
                            id: true,
                            suppliers: true,
                        },
                    },
                },
                where: { prId: prID },
            });

            if (result === null) {
                return NextResponse.json({ empty: true });
            } else {
                //parse quotations data from RFQ
                const quotations = await parseQuotation(result?.quotations as QuotationItem[]);
                const calculatedQuotation = await calculateQuotationsNew(result.pr.particulars as any[], result?.quotations as QuotationItem[])
                const mapped = {
                    id: result.id,
                    final: result.final,
                    date: result.date,
                    furnishedAt: result.furnishedAt,
                    location: result.location,
                    lowestAmount: result.lowestAmount,
                    lowestBidder: result.lowestBidder,
                    prId: result.prId,
                    rfqId: result.rfq?.id as string,
                    quotations,
                    calculatedQuotations: calculatedQuotation.rows ?? [],
                    calculatedQuotationsSum: calculatedQuotation.totals ?? [],
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
                    suppliers: result.rfq?.suppliers,
                    rfqFinal: rfq?.final,
                };
                return NextResponse.json(mapped);
            }
        } else {
            return NextResponse.json({ requiredFinal: true }); //requires the PR document and RFQ to be final
        }
    } catch (err) {
        console.log(`ERRR:ABSTRACT:GET:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("Server Error", { status: 500 });
    }
};

//CREATE NEW QUOTATION -> /administrator/api/abstract?_id=[pr-id]
export const POST = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prID = searchParams.get("_id") as string; //PR ID
        if (typeof prID === "undefined" || prID === null || prID === "") throw new Error("No ID Provided");
        //FIND PR
        const pr = await db.purchase_requests.findFirst({
            select: {
                final: true,
                particulars: true,
            },
            where: { id: prID },
        });

        //FIND RFQ
        const rfq = await db.purchase_price_quotations.findFirst({
            select: { id: true, final: true, suppliers: true },
            where: { prId: prID },
        });

        let isDocumentFinal = await Promise.all([pr, rfq]);

        //!NOTE: making sure the PR and RFQ are final since the data in the ABSTRACT is static,
        //!\ any changes done in the PR or RFQ will not cascade into the abstract record
        //!\ we are making sure that modification is not allowed to prevent inaccurate information

        if (isDocumentFinal.every((item) => item?.final === true)) {
            const quotations = await parseCreateQuotation({
                suppliers: rfq?.suppliers as CreateQuotationItem["suppliers"],
                particulars: pr?.particulars as CreateQuotationItem["particulars"],
            });

            //CREATE PR
            await db.purchase_quotation_abstracts.create({
                data: {
                    quotations,
                    rfqId: rfq?.id,
                    tracking: [],
                    prId: prID,
                    //GENERATE AWARD DOCUMENT
                    award: {
                        create: {
                            content: [],
                            prId: prID,
                            title: "",
                            tracking: [],
                        },
                    },
                },
            });

            return NextResponse.json({ ok: true });
        } else {
            throw new APIError("Required RFQ to be Completed", req.url, METHOD.POST, "server");
        }
    } catch (err) {
        console.log(`ERRR:ABSTRACT:POST:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("Server Error", { status: 500 });
    }
};

//UPDATE RFQ /administrator/api/rfq?_id=[document-id]
export const PUT = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string; //document id
        if (typeof id === "undefined" || id === null || id === "") throw new Error("No ID Provided");
        const data = await req.json();
        if (data === null || typeof data === "undefined") throw new Error("Please Provide A Request Body");

        //calculate Bidder Amount
        const amount = await computeLowestAmount(data.quotations, data.lowestBidder);

        await db.purchase_quotation_abstracts.update({
            data: {
                ...data,
                lowestAmount: amount,
            },
            where: {
                id,
            },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERROR:ABSTRACT:PUT:${req.url}`);
        logger.error(err);
        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("Server Error", { status: 500 });
    }
};

//BIT SIZE UPDATE /administrator/api/rfq?_id=[document-id]&_final=[true|false]
export const PATCH = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const abstractId = searchParams.get("_id") as string; //document id
        if (typeof abstractId === "undefined" || abstractId === null || abstractId === "")
            throw new Error("No ID Provided");

        if (searchParams.get("_final") === "true") {
            const result = await db.purchase_quotation_abstracts.findFirst({
                select: {
                    lowestBidder: true,

                },
                where: {
                    id: abstractId,
                },
            });

            if (!result?.lowestBidder) {
                throw new APIError("Please Select The Lowest Bidder", req.url, METHOD.PATCH, "client");
            }

            await db.purchase_quotation_abstracts.update({
                data: { final: true },
                where: {
                    id: abstractId,
                },
            });
            return NextResponse.json({ ok: true });
        }
    } catch (err) {
        console.log(`ERROR:ABSTRACT:PATCH:${req.url}`);
        logger.error(err);

        if (err instanceof APIError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response(`Server Error`, { status: 500 });
    }
};
