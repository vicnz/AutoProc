import db from '@lib/db'
import sharp from "sharp";
// import { cookies } from "next/headers";
// ─────────────────────────────────────────────────────────────────────────────
import fullname from "@lib/client/fullname";

// ─── Fetch All User By Page Size ─────────────────────────────────────────────
export const fetchAllUsers = async (page: string, size: number) => {
    // const cookieStore = cookies();
    // const theme = cookieStore.get("theme");
    try {
        const _page = Number.parseInt(page);
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
                        name: true,
                    },
                },
                section: {
                    select: {
                        description: true,
                    },
                },
                profile: true,
            },
            skip: _page,
            take: size,
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                isDeleted: false,
                userType: { in: ["CHECKER", "TRACKER", "USER"] },
            },
        });


        const optimizeProfileImage = await Promise.all(
            // ─────────────────────────────────────────────────────
            result.map(async (item) => {
                const { profile } = item;
                const thumbnail = profile
                    ? await sharp(item.profile as Buffer)
                        .resize({ height: 24, width: 24 })
                        .toBuffer()
                    : null;
                return {
                    fullname: fullname({
                        fname: item.fname,
                        mname: item.mname,
                        lname: item.lname,
                        suffix: item.suffix,
                    }),
                    key: item.id,
                    email: item.email,
                    username: item.username,
                    type: item.userType,
                    department: item.department?.description,
                    section: item.section?.description,
                    profile: thumbnail?.toString("base64"),
                    phone: item.phone,
                    link: item.link,
                };
            })
        );
        return optimizeProfileImage;
    } catch (err) {
        console.log(err);
        return []
    }
};


export const fetchSetting = async () => {
    try {
        const setting = await db.settings.findFirst({
            select: {
                name: true,
                value: true,
            },
            where: {
                name: 'paginate'
            }
        })

        if (!setting) return { size: 8 }
        return {
            size: Number(setting.value)
        }
    } catch (err) {
        return { size: 8 }
    }
}

