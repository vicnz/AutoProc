export const revalidate = 0;
/**
 * * FETCH CURRENT LOGIN ADMINSTRATOR'S BASIC INFO
 */

import db from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@lib/auth/options";
import { notFound } from "next/navigation";
import fullname from "@lib/client/fullname";
import sharp from "sharp";

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(options);

    if (session?.user.role !== "ADMIN") {
        notFound();
    }

    const result = await db.users.findFirst({
        select: {
            id: true,
            fname: true,
            mname: true,
            lname: true,
            suffix: true,
            phone: true,
            email: true,
            username: true,
            link: true,
            profile: true,
        },
        where: {
            id: session.user?.id,
            isDeleted: false,
            userType: "ADMIN",
        },
    });

    if (!result) {
        notFound();
    }

    const { id, fname, mname, lname, suffix, username, profile, email, ...rest } = result;

    return NextResponse.json({
        data: {
            id,
            profile: profile ? sharp(profile).resize({ height: 200, width: 2000 }).toBuffer() : null,
            name: fullname({ fname, mname, lname, suffix }, true),
            email,
            username,
        },
    });
};
