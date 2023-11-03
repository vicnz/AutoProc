import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import fullname from "@lib/client/fullname";
import sharp from "sharp";


//GET USERS /administrator/api/user?_id=[]&_pick_only
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        //Pick User Details [Only]
        const incUtilityUser = searchParams.get('_include_utility') as string //include utility user
        if (searchParams.get("_pick_only") === "true") {
            //! FIXME ASAP blob types is causing large performance bottlenecks
            //! even though field is not included on query
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
        }
        if (searchParams.get('all') === "true") {
            /**
             * GET ONLY THE UTILITY USERS AND STANDARD USERS
             */
            const page: number = Number.parseInt(searchParams.get('page') as string)
            const size: number = Number.parseInt(searchParams.get('size') as string)

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
                    //TODO add Phone
                }
            }))

            return NextResponse.json(results);
        }
    } catch (err) {
        return new Response("", { status: 500 });
    }
};
