import fullname from "@lib/client/fullname";
import db from "@lib/db";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import type { IParticulars } from "./type";
import { parseParticulars } from "./utility";
import { logger } from "@logger";

//GET Recommendation Records -> /administator/api/procurement/recommendation
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prID = searchParams.get("_id") as string;
        if (typeof prID === "undefined" || prID === null || prID === "") throw new Error("No ID Provided");

        //!REMINDER: DO NOT USE `includes` in query
        const result = await db.purchase_recommendations.findFirst({
            include: {
                pr: {
                    select: {
                        budget: true,
                        particulars: true,
                        purpose: true,
                        reference: true,
                        number: true,
                        id: true,
                        final: true,
                        user: {
                            select: {
                                id: true,
                                fname: true,
                                mname: true,
                                lname: true,
                                suffix: true,
                                profile: true,
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
            },
            where: {
                prId: prID,
            },
        });

        if (result) {
            const [total, particulars] = await parseParticulars(result.pr?.particulars as IParticulars[]);
            //Parse Result
            const parsed = {
                id: result.id,
                title: result.title,
                content: result.content,
                final: result.final,
                tracking: result.tracking,
                prId: result.prId,
                number: result?.pr.number,
                reference: result?.pr.reference,
                enduser: fullname(
                    {
                        fname: result?.pr.user?.fname,
                        mname: result?.pr.user?.mname,
                        lname: result?.pr.user?.lname,
                        suffix: result?.pr.user?.suffix,
                    },
                    true
                ),
                department: result?.pr.user?.department?.description,
                enduserId: result?.pr.id,
                particulars,
                total: Intl.NumberFormat("en-US", { style: "currency", currency: "PHP" }).format(total as number),
                budget: Intl.NumberFormat("en-US", { style: "currency", currency: "PHP" }).format(result?.pr?.budget),
                prFinal: result.pr.final,
            };
            return NextResponse.json(parsed);
        } else {
            return NextResponse.json({ empty: true });
        }
    } catch (err) {
        console.log(`ERROR:GET:RECOMMENDATION:${req.url}`);
        logger.error(err)
        return new Response("", { status: 500 });
    }
};

//PATCH BIT SIZE UPDATES -> /administrator/api/procurement/recommendation?_id=[valid-document-id]&_final=[true|false]&[,..]
export const PATCH = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const recommendId = searchParams.get("_id") as string; //document id
        if (typeof recommendId === 'undefined' || recommendId === null || recommendId === "") throw new Error("No ID Provided")

        //Make Final
        if (searchParams.get('_final') === 'true') {
            await db.purchase_recommendations.update({
                data: { final: true },
                where: {
                    id: recommendId,
                },
            });
            return NextResponse.json({ ok: true });
        }


    } catch (err) {
        console.log(`ERROR:RECOMMEND:PATCH:${req.url}`);
        logger.error(err)
        return new Response("", { status: 500 });
    }
};
