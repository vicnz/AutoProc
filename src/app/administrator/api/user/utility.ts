import { NextRequest, NextResponse } from "next/server";
import db, { PrismaModels } from '@lib/db'
import sharp from "sharp";
import fullname from "@lib/client/fullname";
import { logger } from "@logger";
import { ClientError } from '@lib/server/client-error'

/**
 * * HANDLE SELECT USER ONLY (USE IN PR CREATION)
 * TODO : convert this into a searchable instead of sending whole list of users
 */
export const handleUserGetPickOnly = async (req: NextRequest) => {
    try {
        const result = await db.users.findMany({
            select: {
                id: true,
                fname: true,
                mname: true,
                lname: true,
                suffix: true,
                username: true,
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
            },
            orderBy: {
                updatedAt: 'desc'
            },
            where: {
                userType: { equals: "USER" },
                isDeleted: { equals: false },
            },
        });

        return NextResponse.json([
            ...result.map((item) => {
                return {
                    id: item.id,
                    name: fullname(
                        {
                            fname: item.fname,
                            mname: item.mname,
                            lname: item.lname,
                            suffix: item.suffix,
                        },
                        true
                    ),
                    department: item.department?.description,
                    section: item.section?.description,
                };
            }),
        ]);
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message)
        }
        if (err instanceof ClientError) {
            return new Response(JSON.stringify({ message: err.message, type: err.type }), { status: err.status })
        }
        return new Response(JSON.stringify({ error: true }), { status: 500 })
    }
}
/**
 * * HANDLE FETCHING SINGLE USER (ONE)
 */
export const handleUserGet = async (id: string, req: NextRequest) => {
    try {
        const result = await db.users.findFirst({
            select: {
                id: true,
                email: true,
                username: true,
                fname: true,
                mname: true,
                lname: true,
                suffix: true,
                departmentId: true,
                sectionId: true,
                department: {
                    select: { description: true }
                },
                section: {
                    select: { description: true }
                },
                userType: true,
                link: true,
                phone: true,
                profile: true
            },
            where: {
                id,
                isDeleted: false,
                userType: {
                    in: ['CHECKER', 'TRACKER', 'USER']
                }
            }
        })

        if (!result) {
            throw new ClientError("Not Found", req.url, 'server', 404)
        }
        let parseImage = null;
        if (result.profile) {
            parseImage = await sharp(result.profile).resize(100, 100).toBuffer()
        }
        const parsed: Partial<PrismaModels['users'] & { fullname: string, department: string | null, section: string | null }> = {
            id: result.id,
            fname: result.fname,
            mname: result.mname,
            lname: result.lname,
            suffix: result.suffix,
            fullname: fullname({ fname: result.fname, mname: result.mname, lname: result.lname, suffix: result.suffix }, true),
            link: result.link,
            email: result.email,
            phone: result.phone,
            profile: parseImage,
            department: result.department?.description,
            departmentId: result.departmentId,
            section: result.section?.description,
            sectionId: result.sectionId,
            userType: result.userType,
            username: result.username
        }

        return NextResponse.json(parsed)

    } catch (err: Error | unknown) {
        if (err instanceof Error) {
            logger.error(err.message)
        }
        if (err instanceof ClientError) {
            return new Response(JSON.stringify({ message: err.message, type: err.type }), { status: err.status })
        }
        return new Response(JSON.stringify({ error: true }), { status: 500 })
    }
}

/**
 * * HANDLE FETCHING MANY USERS (8) PER REQUEST
 */
export const handleManyUserGet = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    try {
        const page: number = Number.parseInt(searchParams.get('page') as string)
        const size: number = Number.parseInt(searchParams.get('size') as string)
        //GET SHALLOW ALL USERS
        const result = await db.users.findMany({
            select: {
                id: true,
                fname: true,
                mname: true,
                lname: true,
                email: true,
                username: true,
                userType: true,
                suffix: true,
                phone: true,
                link: true,
                department: {
                    select: {
                        description: true,
                        name: true
                    }
                },
                profile: true,
            },
            skip: page || 0,
            take: size || 8,
            orderBy: {
                updatedAt: 'desc'
            },
            where: {
                isDeleted: false,
                userType: { in: ['CHECKER', 'TRACKER', 'USER'] }
            }
        })

        const results = await Promise.all(result.map(async item => {
            const { profile } = item
            const thumbnail = profile ? await sharp(item.profile as Buffer,).resize({ height: 24, width: 24 }).toBuffer() : null
            return {
                key: item.id,
                fullname: fullname({ fname: item.fname, mname: item.mname, lname: item.lname, suffix: item.suffix }),
                email: item.email,
                username: item.username,
                type: item.userType,
                department: item.department?.description,
                profile: thumbnail,
                phone: item.phone,
                link: item.link
            }
        }))
        return NextResponse.json(results);
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message)
        }
        if (err instanceof ClientError) {
            return new Response(JSON.stringify({ message: err.message, type: err.type }), { status: err.status })
        }
        return new Response(JSON.stringify({ error: true }), { status: 500 })
    }
}

export const handleAdminGet = async (id: string, req: NextRequest) => {

}

export const handleUserPost = async (req: NextRequest) => {

}

export const handleAdminPost = async (req: NextRequest) => {

}
