import { NextRequest, NextResponse } from "next/server";
import prisma from '@lib/db'

//GET PAGINATED DATA
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const page: number = Number.parseInt(searchParams.get('page') as string) //PAGE NUMBER
        const size: number = Number.parseInt(searchParams.get('size') as string) //PAGE SIZE

        const result = await prisma.purchase_requests.findMany({
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
                        department: { select: { description: true } },
                        section: { select: { description: true } },
                    },
                },
                abstract: true,
                recomend: true,
                award: true,
                rfq: true,
                po: true,
                final: true,
            },
            skip: page,
            take: size || 8,
            orderBy: {
                updatedAt: "desc",
            },
        });

        const ListFormatter = new Intl.ListFormat('en')

        const parsed = result.map(item => {
            return {
                key: item.id,
                number: item.number,
                reference: `BAC-RESO NO.${item.reference}`,
                id: item.id,
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
                enduser: `${item.user?.fname} ${item.user?.mname ? item.user?.mname + " " : ""
                    } ${item.user?.lname}`,
                enduserId: item.user?.id,
                department: item.user?.department?.description,
                section: item.user?.section?.description,
            };
        })

        return NextResponse.json(parsed)
    } catch (err) {
        console.log(err)
        return new Response('', { status: 500 })
    }

}