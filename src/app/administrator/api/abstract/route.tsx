import fullname from "@/lib/fullname";
import db, { PrismaModels } from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
//types

//Specific Custom Error For Request For Quotation
class AbstractQuotationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RequestForQuotationError";
    }
}

//GET ABSTRACT QUOTATIONS -> /administrator/api/abstract?_id=[valid-pr-id]
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prID = searchParams.get("_id") as string; //PR ID
        if (prID === null) throw new Error("Please Provide an ID");

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

        let isDocumentFinal = await Promise.all([pr, rfq]);

        //!NOTE: making sure the PR and RFQ are final since the data in the ABSTRACT is static,
        //!\ any changes done in the PR or RFQ will not cascade into the abstract record
        //!\ we are making sure that modification is not allowed to prevent inaccurate information

        if (isDocumentFinal.every((item) => item?.final === true)) {
            //fetch abstract
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
                                            sections: {
                                                select: {
                                                    description: true,
                                                },
                                            },
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
                const quotations = (
                    result?.quotations as Array<{
                        id: string;
                        supplier: string;
                        particulars: Array<{ total: number; description: string }>;
                    }>
                ).map((item) => {
                    return {
                        supplier: item.supplier,
                        id: item.id,
                        //Parse Abstract Quotations
                        ...Object.fromEntries(
                            Object.entries(
                                item.particulars.reduce((result: any, item, index) => {
                                    //TODO create an alternative way to be used to identify the row
                                    result[`${item["description"]}`] = item.total; //!Removed Quantity -> Assuming the Price is already the computed amount of (unit-price * quantity)
                                    return result;
                                }, {})
                            )
                        ),
                        //Compute ROW total
                        total: (item.particulars as Array<{ total: number }>).reduce(
                            (accumulator, item) => {
                                return accumulator + item.total;
                            },
                            0
                        ),
                    };
                });

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
                return NextResponse.json(mapped || { empty: true });
            }
        } else {
            return NextResponse.json({ requiredFinal: true }); //requires the PR document and RFQ to be final
        }
    } catch (err) {
        console.log(`ERRR:ABSTRACT:GET:${req.url}`);
        console.log(err);
        if (err instanceof AbstractQuotationError) {
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
            //parse quotations
            const quotations = (
                rfq?.suppliers as Array<{ id: string; name: string }>
            ).map((item) => {
                return {
                    id: item.id,
                    supplier: item.name,
                    particulars: (
                        pr?.particulars as Array<{ qty: number; description: string }>
                    ).map((item) => {
                        return { description: item.description, total: 0.0 };
                    }),
                };
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
            throw new AbstractQuotationError("Required RFQ to be Completed");
        }
    } catch (err) {
        console.log(`ERRR:ABSTRACT:POST:${req.url}`);
        console.log(err);
        if (err instanceof AbstractQuotationError) {
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
        const data = await req.json();
        if (data === null || typeof data === "undefined")
            throw "Please Provide A Request Body";

        //calculate Bidder Amount
        let bidderAmount = 0;
        if (data.lowestBidder) {
            bidderAmount = data.quotations.filter(
                (item: { id: string }) => item.id === data?.lowestBidder
            )[0].total;
        }

        await db.purchase_quotation_abstracts.update({
            data: {
                ...data,
                lowestAmount: bidderAmount,
            },
            where: {
                id,
            },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERROR:ABSTRACT:PUT:${req.url}`);
        console.log(err);

        if (err instanceof AbstractQuotationError) {
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
        const setFinal = searchParams.get("_final") as "true" | "false";

        if (setFinal === "true") {
            const result = await db.purchase_quotation_abstracts.findFirst({
                select: {
                    lowestBidder: true,
                },
                where: {
                    id: abstractId,
                },
            });

            if (!result?.lowestBidder) {
                throw new AbstractQuotationError("Please Select The Lowest Bidder");
            }

            await db.purchase_quotation_abstracts.update({
                data: { final: true },
                where: {
                    id: abstractId,
                },
            });
            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ action: "none" });
    } catch (err) {
        console.log(`ERROR:ABSTRACT:PATCH:${req.url}`);
        console.log(err);

        if (err instanceof AbstractQuotationError) {
            return new Response(err.message, { status: 500 });
        }
        return new Response(`Server Error`, { status: 500 });
    }
};
