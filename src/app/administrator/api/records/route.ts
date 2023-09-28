import { NextRequest, NextResponse } from "next/server";
import prisma from '@lib/db'


export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const page: number = Number.parseInt(searchParams.get('page') as string)
        const size: number = Number.parseInt(searchParams.get('size') as string)

        const result = await prisma.pr.findMany({
            select: {
                pr_no: true,
                reference: true,
                id: true,
                purpose: true,
                particulars: true,
                enduser: { select: { id: true, fname: true, mname: true, lname: true, department: { select: { description: true } }, section: { select: { description: true } } } },
                abstract: true,
                recommendation: true,
                awarding: true,
                request_for_quoation: true,
                po: true,
                final: true,
            },
            skip: page,
            take: size || 8,
            orderBy: {
                updatedAt: 'desc'
            }
        })
        const parsed = result.map(item => {
            return {
                pr_no: item.pr_no,
                reference: `BAC-RESO NO. ${item.reference}`,
                id: item.id,
                purpose: item.purpose,
                particulars: (item.particulars as Array<{ qty: number, description: string, stock_no: string, price: number, unit: string }>)
                    .map(item => item.description).join(','),
                enduser: `${item.enduser?.fname} ${item.enduser?.mname ? item.enduser?.mname + ' ' : ''} ${item.enduser?.lname}`,
                enduserId: item.enduser?.id,
                department: item.enduser?.department?.description,
                section: item.enduser?.section?.description,
            }
        })

        return NextResponse.json(parsed)
    } catch (err) {
        return new Response('', { status: 500 })
    }

}
