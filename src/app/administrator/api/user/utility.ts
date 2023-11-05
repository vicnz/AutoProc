/**
 * * UTILITY FILE
 * * ALL OF THE API SUB HANDLER ARE DEFINED HERE
 */
import { NextRequest, NextResponse } from "next/server";
import db, { PrismaModels, PrismaClientError } from '@lib/db'
import sharp from "sharp";
import fullname from "@lib/client/fullname";
import { logger } from "@logger";
import { ClientError } from '@lib/server/client-error'
import { hashPassword } from '@lib/server/password-hash'
import { randomRange } from '@lib/client/random-range'
import { toListLimited } from '@lib/intl/list'

/**
 * * HANDLE SELECT USER ONLY (USE IN PR CREATION)
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
                userType: { equals: "USER" }, //!PICK ONLY [USER] TYPE
                isDeleted: { equals: false },
            },
        });

        const parsedData = result && result.map((item) => {
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
        })

        //SEND TO CLIENT
        return NextResponse.json(parsedData || []);

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
 * TODO HANDLE SELECT USER ONLY (SEARCHABLE) -> NEW APPROACH
 */
export const handleUserGetPickOnlyBeta = async (req: NextRequest) => {

}
/**
 * * HANDLE SELECT USER INFORMATION
 */
export const handleUserGet = async (id: string, req: NextRequest) => {
    try {
        const result = await db.users.findFirst({
            select: {
                id: true,
                email: true,
                username: true, //! AVAILABLE ON AUTO-PROC 2
                password: false, //! AVAILABLE ON AUTO-PROC 2
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
            //THROW A NOT FOUND ERROR
            throw new ClientError("Not Found", req.url, 'server', 404)
        }
        //PARSE IMAGE 
        let parseImage = null;
        if (result.profile) {
            parseImage = await sharp(result.profile).resize(125, 125).toBuffer() //REDUCE IMAGE SIZE
        }
        //
        const parsed: Partial<PrismaModels['users'] & { fullname: string, department: string | null, section: string | null }> = {
            id: result.id,
            fname: result.fname,
            mname: result.mname,
            lname: result.lname,
            suffix: result.suffix,
            fullname: fullname({ fname: result.fname, mname: result.mname, lname: result.lname, suffix: result.suffix }, true), //SET FULLNAME
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

        //SEND TO CLIENT
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
 * * FETCH USER PURCHASE REQUEST ITEMS
 */
export const handleUserPurchaseRequests = async (id: string, req: NextRequest) => {
    try {
        const result = await db.users.findUnique({
            select: {
                pr: {
                    select: {
                        id: true,
                        date: true,
                        final: true,
                        number: true,
                        purpose: true,
                        reference: true,
                        particulars: true
                    }
                }
            },
            where: {
                id,
                isDeleted: false
            }
        })
        const parseParticulars = await Promise.all((result?.pr as Array<{ particulars: any[] }>).map(item => {
            const descriptions = item.particulars.map((item: { description: string }) => item.description)
            return {
                ...item,
                particulars: toListLimited(descriptions, 3)
            }
        }));


        return NextResponse.json(parseParticulars || [])
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
                section: {
                    select: {
                        description: true
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
                section: item.section?.description,
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

//? CREATE NEW USER
export const handleUserPost = async (req: NextRequest) => {
    try {
        const body: Omit<PrismaModels['users'], 'isDeleted' | 'createdAt' | 'updatedAt'> = await req.json()
        if (typeof body === 'undefined' || body === null) throw new ClientError("No Body Provided", req.url, 'server', 500)
        const parseData = {
            ...body,
            password: await hashPassword(body.email as string || body.fname.replace(" ", "_")), //?generate a mock password | available on AutoProc V2
            username: `${body.fname.toLowerCase().replace(" ", "_")}${randomRange(10, 100)}`, //?generate this | available on AutoProc V2   
        }

        // Handle Passwords
        await db.users.create({
            data: {
                ...parseData
            }
        })

        return NextResponse.json({ ok: true })

    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message)
        }
        if (err instanceof ClientError) {
            return new Response(JSON.stringify({ message: err.message, type: err.type }), { status: err.status })
        }
        if (err instanceof PrismaClientError) {
            if (err.code === 'P2002') {
                return new Response(JSON.stringify({ message: "Duplicate User, Reason: The Same Email, ... ", type: 'client' }), { status: 500 })
            }
            return new Response(JSON.stringify({ error: true }), { status: 500 })
        }
        return new Response(JSON.stringify({ error: true }), { status: 500 })
    }
}
//? UPDATE USER
export const handleUserPut = async (id: string, req: NextRequest) => {
    try {
        const body: Omit<PrismaModels['users'], 'isDeleted' | 'createdAt' | 'updatedAt'> = await req.json()
        if (typeof body === 'undefined' || body === null) throw new ClientError("No Body Sent", req.url, 'server', 500)
        //TODO check if record with {id} exists
        const parseData = {
            ...body,
        }
        await db.users.update({
            data: parseData,
            where: {
                id
            }
        })
        return NextResponse.json({ ok: true })
        //
    } catch (err) {
        console.log(err)
        if (err instanceof Error) {
            logger.error(err.message)
        }
        if (err instanceof ClientError) {
            return new Response(JSON.stringify({ message: err.message, type: err.type }), { status: err.status })
        }
        if (err instanceof PrismaClientError) {
            if (err.code === 'P200') {
                return new Response(JSON.stringify({ message: "Duplicate User", type: 'client' }), { status: 500 })
            }
            return new Response(JSON.stringify({ error: true }), { status: 500 })
        }
        return new Response(JSON.stringify({ error: true }), { status: 500 })
    }
}
//@ADMIN
export const handleAdminPost = async (req: NextRequest) => {

}
export const handleAdminGet = async (id: string, req: NextRequest) => {

}
