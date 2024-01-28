export const revalidate = 0;
import { NextRequest, NextResponse } from "next/server";
import db from "@lib/db";
import fullname from "@lib/client/fullname";
import APIError, { METHOD } from "@lib/server/api-error";
import { logger } from '@logger'
import { computePRStatus } from './utlity'

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
    status: number
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
                delivery: {
                    select: { final: true }
                }
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

        const parsed = result.map(async (item, idx) => {

            const status = [
                item.final || false, //PR is Final?
                item.recomend[0]?.final || false, //Recommendation is Final?
                item.rfq[0]?.final || false, //RFQ is Final?
                item.abstract[0]?.final || false, //Abstract is Final?
                item.award[0]?.final || false, //Awarding is Final?
                item.po[0]?.final || false, //PO is Final,
                item.delivery[0]?.final || false //delivery is final
            ]
            const progress = computePRStatus(status) //compute progresss
            return {
                id: item.id,
                key: item.id,
                number: item.number,
                reference: `${item.reference}`,
                purpose: item.purpose,
                particulars: ListFormatter.format(
                    (item.particulars as Array<{ description: string }>).map((item) => item.description)
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
                status: progress,
            };
        });

        const response = await Promise.all(parsed)

        return NextResponse.json(response);
    } catch (err) {
        console.log(err)
        if (err instanceof APIError) {
            logger.error(err.message)
            return new Response(JSON.stringify({ message: err.message, type: err.type }), { status: 500 })
        }
        return new Response("", { status: 500 });
    }
};
