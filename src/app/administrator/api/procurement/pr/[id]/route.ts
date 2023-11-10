import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import { computeParticulars } from "../utlity";
import { IParticulars } from "../types";
import fullname from "@lib/client/fullname";
import dayjs from "dayjs";
import { logger } from "@logger";
//
type ParamType = {
    params: {
        id: string
    }
}

export const GET = async function (req: NextRequest, slug: ParamType) {
    try {
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
                id: slug.params.id
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
 * * UPDATE REQUEST
 * ? PUT URI --> /administrator/api/procurement/pr?_id=[valid-pr-id]
 */

export const PUT = async function (req: NextRequest, slug: ParamType) {
    try {
        const body = await req.json();
        if (typeof body === "undefined" || body === null) throw new Error("No Body ID");
        //UPDATE
        await db.purchase_requests.update({
            data: { ...body },
            where: { id: slug.params.id },
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
 */
export const PATCH = async function (req: NextRequest, slug: ParamType) {
    const { searchParams } = new URL(req.url);
    try {
        const setFinal = searchParams.get("_final") as string;

        //MARK DOCUMENT AS FINAL
        if (setFinal === "true") {
            await db.purchase_requests.update({
                data: { final: true },
                where: {
                    id: slug.params.id,
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
