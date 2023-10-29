import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import fullname from "@/lib/fullname";
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

            const parsed = await Promise.all(result.map(async (item) => {
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
            }),)

            return NextResponse.json(parsed);
        }
    } catch (err) {
        return new Response("", { status: 500 });
    }
};
