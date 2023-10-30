import { NextRequest, NextResponse } from "next/server";
import db, { PrismaModels } from "@lib/db";
import fullname from "@lib/client/fullname";

//Response Type
export type ResponseType = {
    key: string;
    number: string | null;
    reference: string;
    id: string;
    purpose: string;
    particulars: string;
    enduser: string;
    enduserId: string | null;
    department: string | null;
    section: string | null;
};

//GET RECORD LIST PAGINATED -> /administrator/api/procurements?page=[number]&size=[number]&completed=[boolean]
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        const page: number = Number.parseInt(searchParams.get("page") as string); //PAGE NUMBER
        const size: number = Number.parseInt(searchParams.get("size") as string); //PAGE SIZE

        const result = await db.purchase_requests.findMany({
            select: {
                number: true,
                reference: true,
                id: true,
                purpose: true,
                particulars: true,
                user: {
                    select: {
                        id: true,
                        fname: true,
                        mname: true,
                        lname: true,
                        suffix: true,
                        department: { select: { description: true } },
                        section: { select: { description: true } },
                    },
                },
                final: true,
                abstract: {
                    select: { final: true },
                },
                recomend: {
                    select: { final: true },
                },
                award: {
                    select: { final: true },
                },
                rfq: {
                    select: { final: true },
                },
                po: {
                    select: { final: true },
                },
                //TODO add delivery status
            },
            skip: page,
            take: size || 8,
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                isDeleted: false,
            },
        });

        const ListFormatter = new Intl.ListFormat("en");

        const parsed = result.map((item, idx) => {
            return {
                id: item.id,
                key: item.id,
                number: item.number,
                reference: `${item.reference}`,
                purpose: item.purpose,
                particulars: ListFormatter.format(
                    (
                        item.particulars as Array<{
                            qty: number;
                            description: string;
                            stock_no: string;
                            price: number;
                            unit: string;
                        }>
                    ).map((item) => item.description)
                ),
                enduser: fullname(
                    {
                        fname: item.user?.fname,
                        mname: item.user?.mname,
                        lname: item.user?.lname,
                        suffix: item.user?.suffix,
                    },
                    true
                ),
                enduserId: item.user?.id,
                department: item.user?.department?.description,
                section: item.user?.section?.description,
                status: [
                    item.final || false, //PR is Final?
                    item.recomend[0]?.final || false, //Recommendation is Final?
                    item.rfq[0]?.final || false, //RFQ is Final?
                    item.abstract[0]?.final || false, //Abstract is Final?
                    item.award[0]?.final || false, //Awarding is Final?
                    item.po[0]?.final || false, //PO is Final,
                    //TODO include delivery status too.
                ],
            };
        });

        return NextResponse.json(parsed);
    } catch (err) {
        console.log(err);
        return new Response("", { status: 500 });
    }
};
