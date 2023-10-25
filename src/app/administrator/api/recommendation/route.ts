import fullname from "@/lib/fullname";
import db from "@lib/db";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

//types
type IParticulars = {
    qty: number;
    unit: string;
    description: string;
    stock: string;
    price: number;
};

//GET Recommendation Records -> /administator/api/recommendation
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const prID = searchParams.get("_id") as string; //PR ID

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

            let total = 0;
            let particulars: string[] | string = [];
            //compute total
            (result.pr.particulars as IParticulars[])?.forEach((item) => {
                if (Array.isArray(particulars)) {
                    particulars.push(item.description);
                }
                total += item.price * item.qty;
            });

            const ListFormatter = new Intl.ListFormat("en");
            particulars = ListFormatter.format(particulars);

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
                total: Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP",
                }).format(total),
                budget: Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP",
                }).format(result?.pr?.budget),
                prFinal: result.pr.final,
            };
            return NextResponse.json(parsed);
        } else {
            return NextResponse.json({ empty: true })
        }

    } catch (err) {
        console.log(`ERROR:GET:RECOMMENDATION:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};


//PATCH BIT SIZE UPDATES -> /administrator/api/recommendation?_id=[valid-document-id]&_final=[true|false]&[,..]
export const PATCH = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const recommendId = searchParams.get("_id") as string; //document id
        const setFinal = searchParams.get("_final") as 'true' | 'false'; //
        if (setFinal === "true") {
            await db.purchase_recommendations.update({
                //TODO set the tracking to current administrator office
                data: { final: true },
                where: {
                    id: recommendId,
                },
            });
            return NextResponse.json({ ok: true });
        }
        return NextResponse.json({ action: "none" });
    } catch (err) {
        console.log(`ERROR:RECOMMEND:PATCH:${req.url}`);
        console.log(err);
        return new Response("", { status: 500 });
    }
};
