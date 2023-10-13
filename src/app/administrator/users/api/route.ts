import db from '@lib/db'
import { NextRequest, NextResponse } from 'next/server'
import fullname from '@/lib/fullname'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {

        //Pick Only
        if (searchParams.get('_pick_only') === 'true') {
            const result = await db.users.findMany({
                select: {
                    id: true,
                    fname: true,
                    mname: true,
                    lname: true,
                    suffix: true,
                    profile: true,
                    username: true,
                    department: {
                        select: {
                            description: true,
                            sections: { select: { description: true } },
                        },
                    },
                },
                orderBy: {
                    updatedAt: "desc",
                },
                where: {
                    userType: { equals: 'USER' },
                    isDeleted: { equals: false },
                },
            });

            return NextResponse.json([
                ...result.map(item => {
                    return {
                        id: item.id,
                        name: fullname({ fname: item.fname, mname: item.mname, lname: item.lname, suffix: item.suffix }, true),
                        profile: item.profile,
                        department: item.department?.description,
                        //@ts-ignore
                        section: item.department?.sections?.description
                    }
                })
            ])
        }

        const result = await db.users.findMany({
            where: {
                isDeleted: false
            },
            orderBy: {
                updatedAt: 'desc',
            }
        })

        return NextResponse.json(result);
    } catch (err) {
        return new Response('', { status: 400 })
    }
}