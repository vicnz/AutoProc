/**
 * * PURCHASE ORDER CRUD
 * * CREATE -> [PR, RECOMMENDATION, RFQ]
 * * UPDATE
 * * PATCH -> [final]
 */

import db from "@lib/db";
import fullname from "@lib/client/fullname";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { computeParticulars } from "./utlity";
import type { IParticulars } from './types'
import { logger } from '@logger'

/**
 * * GET REQUEST
 * ? GET URI --> /administrator/api/procurement/pr?_id=[valid-pr-id]
 * @ FUNCTION MIGRATED TO -> PR/[ID]/ROUTE.TS
 */

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);

    try {
        const id = searchParams.get("_id") as string;
        if (typeof id === 'undefined' || id === null || id === "") throw new Error("No ID Provided")

        const result = await db.purchase_requests.findFirst({
            select: {
                id: true,
                budget: true,
                final: true,
                purpose: true,
                reference: true,
                userId: true,
                number: true,
                obr: true,
                type: true, //TODO document type used for AUTOPROC-V2
                particulars: true,
                date: true,
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
            where: {
                id,
            },
        });

        if (result) {
            //Compute Total Cost
            const particulars = computeParticulars(result?.particulars as IParticulars[]);
            const response = {
                ...result,
                enduser: fullname(
                    {
                        fname: result?.user?.fname,
                        mname: result?.user?.mname,
                        lname: result?.user?.lname,
                        suffix: result?.user?.suffix,
                    },
                    true
                ),
                department: result?.user?.department?.description,
                section: result?.user?.section?.description,
                date: dayjs(result?.date).toISOString(),
                particulars,
            }

            return NextResponse.json(response); //send to client
        } else {
            return NextResponse.json({ empty: true }) //return empty when no PR was found
        }
    } catch (err) {
        console.log(`ERR:PR:GET:(${req.url})`);
        console.log(err);
        return new Response("Server Error", { status: 500 });
    }
};

/**
 * * POST REQUEST
 * ? POST URI --> /administrator/api/procurement/pr [application/json] -> {id, ...}
 */

export const POST = async function (req: NextRequest) {
    try {
        //Create  Request For Quotation & Recommending Document
        const body = await req.json();
        if (typeof body === "undefined" || body === null) throw new Error("No Body Provided");

        await db.purchase_requests.create({
            data: {
                ...body,
                tracking: [],
                //CREATE RECOMMENDED DOCUMENT TEMPLATE
                recomend: {
                    create: {
                        content: [],
                        title: "",
                        tracking: [],
                    },
                },
                //CREATE RFQ DOCUMENT TEMPLATE
                rfq: {
                    create: {
                        suppliers: [],
                        tracking: [],
                        ris: "",
                    },
                },
            },
        });

        return NextResponse.json({ ok: true }); //send to client
    } catch (err) {
        console.log(`ERR:PR:POST:(${req.url})`);
        logger.error(err)
        return new Response("", { status: 500 });
    }
};

/**
 * * UPDATE REQUEST
 * ? PUT URI --> /administrator/api/procurement/pr?_id=[valid-pr-id]
 * @ FUNCTION MIGRATED TO -> PR/[ID]/ROUTE.TS
 */

export const PUT = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id"); //document id
        if (typeof id === "undefined" || id === null) throw new Error("No Provided ID");
        const body = await req.json();
        if (typeof body === "undefined" || body === null) throw new Error("No Body ID");
        //UPDATE
        await db.purchase_requests.update({
            data: { ...body },
            where: { id },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERR:PR:PUT:(${req.url})`);
        logger.error(err)
        return new Response("Server Error", { status: 500 });
    }
};

/**
 * * PATCH REQUEST
 * ? PATCH URI --> /administrator/api/procurement/pr?_id=[valid-pr-id]&[...params]
 * ? PARAMS
 * ? - _final="true"
 * @ FUNCTION MIGRATED TO -> PR/[ID]/ROUTE.TS
 */
export const PATCH = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string; //document id
        if (typeof id === "undefined" || id === null) throw new Error("No Provided ID");
        const setFinal = searchParams.get("_final") as string;

        //MARK DOCUMENT AS FINAL
        if (setFinal === "true") {
            await db.purchase_requests.update({
                data: { final: true },
                where: {
                    id: id,
                },
            });
            return NextResponse.json({ ok: true });
        }
    } catch (err) {
        console.log(`ERROR:PR:PATCH:${req.url}`);
        logger.error(err)
        return new Response("", { status: 500 });
    }
};
