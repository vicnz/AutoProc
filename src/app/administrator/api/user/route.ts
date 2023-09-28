import { NextRequest, NextResponse } from "next/server";
import prisma from '@lib/db'
import mockdata from './data.test'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    if (searchParams.get('reqtype') === 'selection') {
        const result = await prisma.users.findMany({
            select: {
                id: true,
                fname: true,
                mname: true,
                lname: true,
                suffix: true,
                profile: true,
                department: { select: { name: true, description: true } },
                section: { select: { name: true, description: true } },
            },
            where: {
                userType: 'USER',
            }
        })
        return NextResponse.json(result)
    }

}