import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import fullname from "@/lib/fullname";


//GET USERS /administrator/api/user?_id=[]&_pick_only
export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url);
    try {
        //Pick User Details [Only]
        const incUtilityUser = searchParams.get('_include_utility') as string //include utility user
        if (searchParams.get("_pick_only") === "true") {
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
                        profile: item.profile,
                        department: item.department?.description,
                        section: item.department?.sections[0]?.description,
                    };
                }),
            ]);
        }

        const result = await db.users.findMany({
            where: {
                isDeleted: false,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        return NextResponse.json(result);
    } catch (err) {
        return new Response("", { status: 400 });
    }
};
