import fullname from "@lib/client/fullname";
import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

//GET Award Information -> /administrator/api/award?_id=[pr-id]
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prID = searchParams.get("_id") as string; //pr ID
        if (prID === null) throw new Error("No ID Provided");

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
                                        sections: {
                                            select: {
                                                description: true,
                                            },
                                        },
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

            //Parse Quotations
            const quotations = (
                result.abstract.quotations as Array<{
                    supplier: string;
                    id: string;
                    particulars: Array<{
                        total: number;
                        description: string;
                    }>;
                }>
            ).map((item) => {
                return {
                    supplier: item.supplier,
                    id: item.id,
                    ...Object.fromEntries(
                        Object.entries(
                            item.particulars.reduce((result: any, item, index) => {
                                result[`${item["description"]}`] = item.total; //!Removed Quantity -> Assuming the Price is already the computed amount of (unit-price * quantity)
                                return result;
                            }, {})
                        )
                    ),
                    total: (item.particulars as Array<{ total: number }>).reduce(
                        (accumulator, item) => {
                            return accumulator + item.total;
                        },
                        0
                    ),
                };
            });

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
                    (result.pr.particulars as Array<{ description: string }>).map(
                        (item) => item.description
                    )
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
                amount: result.abstract.lowestAmount
            };

            return NextResponse.json(parsed);
        }
    } catch (err) {
        console.log(`ERROR:AWARD:GET:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};

//BIT SIZE UPDATE -> /administrator/api/awards?_id=[document-id]&_final=[true|false]
export const PATCH = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const awardId = searchParams.get("_id") as string; //document id
        const setFinal = searchParams.get("_final") as string;
        if (awardId === null) throw new Error("Please provide an ID")

        if (setFinal === "true") {
            await db.purchase_awards.update({
                data: { final: true },
                where: {
                    id: awardId,
                },
            });
            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ action: "none" });
    } catch (err) {
        console.log(`ERROR:AWARD:PATCH:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};
