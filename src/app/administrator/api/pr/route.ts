import db from "@lib/db";
import fullname from "@lib/fullname";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

//types
type IParticulars = {
    qty: number;
    unit: string;
    description: string;
    stock: string;
    price: number;
};
//GET URI --> /administrator/api/pr?_id=[valid-pr-id]
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string;
        const result = await db.purchase_requests.findFirstOrThrow({
            include: {
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
                                description: true
                            }
                        }
                    }
                },
            },
            where: {
                id,
            },
        });

        //Compute Total Cost
        const particulars = (result?.particulars as IParticulars[]).map((item) => {
            const totalPrice = item.price * item.qty;
            return { ...item, key: item.description, total: totalPrice };
        });

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

//CREATE NEW PR -> /administrator/api/pr [application/json] -> {id, ...}
export const POST = async function (req: NextRequest) {
    const { json } = NextResponse;
    try {
        //Create  Request For Quotation & Recommending Document
        const body = await req.json();

        await db.purchase_requests.create({
            data: {
                ...body, //!convert date object to string in client-side
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

//UPDATE PR URI -> /administrator/api/pr?_id=[valid-pr-id]
export const PUT = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id"); //document id
        if (id === null) throw new Error("No Provided ID");
        const data = await req.json();
        //UPDATE
        await db.purchase_requests.update({
            data: { ...data },
            where: { id },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log(`ERR:PR:PUT:(${req.url})`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};

//BITE SIZE UPDATE
export const PATCH = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const id = searchParams.get("_id") as string; //document id
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
