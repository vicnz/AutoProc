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

//types
type IParticulars = {
    qty: number;
    unit: string;
    description: string;
    stock: string;
    price: number;
};

/**
 * * GET REQUEST
 * ? GET URI --> /administrator/api/pr?_id=[valid-pr-id]
 */

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string;
        const result = await db.purchase_requests.findFirstOrThrow({
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

        //Compute Total Cost
        const particulars = computeParticulars(result?.particulars as IParticulars[]);

        return NextResponse.json({
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
            sections: result?.user?.section?.description,
            date: dayjs(result?.date).toISOString(),
            particulars,
        });
    } catch (err) {
        console.log(`ERR:PR:GET:(${req.url})`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};

/**
 * * POST REQUEST
 * ? POST URI --> /administrator/api/pr [application/json] -> {id, ...}
 */

export const POST = async function (req: NextRequest) {
    const { json } = NextResponse;
    try {
        //Create  Request For Quotation & Recommending Document
        const body = await req.json();
        if (typeof body === "undefined" || body === null) throw new Error("No Body Provided");

        await db.purchase_requests.create({
            data: {
                ...body,
                tracking: [],
                //CREATE RECOMMEND BODY
                recomend: {
                    create: {
                        content: [],
                        title: "",
                        tracking: [],
                    },
                },
                //CREATE RFQ BODY
                rfq: {
                    create: {
                        suppliers: [],
                        tracking: [],
                        ris: "",
                    },
                },
            },
        });

        return json({ ok: true });
    } catch (err) {
        console.log(`ERR:PR:POST:(${req.url})`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};

/**
 * * UPDATE REQUEST
 * ? PUT URI --> /administrator/api/pr?_id=[valid-pr-id]
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
        console.log(err);
        return new Response("", { status: 500 });
    }
};

/**
 * * PATCH REQUEST
 * ? PATCH URI --> /administrator/api/pr?_id=[valid-pr-id]&[...params]
 * ? PARAMS
 * ? - _final="true"
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

        return NextResponse.json({ action: "none" });
    } catch (err) {
        console.log(`ERROR:PR:PATCH:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};
