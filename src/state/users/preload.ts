import fullname from "@lib/client/fullname";
import db from "@lib/db";
import sharp from "sharp";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

//FETCH MULTIPLE USERS
export const fetchAllUsers = async (page: string) => {
    const cookieStore = cookies();
    const theme = cookieStore.get("theme");
    //trigger error.js when page | size is not a number or it's negative
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
            take: 8,
            orderBy: {
                updatedAt: "desc",
            },
            where: {
                isDeleted: false,
                userType: { in: ["CHECKER", "TRACKER", "USER"] },
            },
        });
        const results = await Promise.all(
            result.map(async (item) => {
                const { profile } = item;
                const thumbnail = profile
                    ? await sharp(item.profile as Buffer)
                        .resize({ height: 24, width: 24 })
                        .toBuffer()
                    : null;
                return {
                    key: item.id,
                    fullname: fullname({
                        fname: item.fname,
                        mname: item.mname,
                        lname: item.lname,
                        suffix: item.suffix,
                    }),
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
        return results;
    } catch (err) {
        console.log(err);
        notFound();
    }
};

//FETCH A SINGLE USER

export const fetchUser = async (id: string) => {
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
                select: { description: true },
            },
            section: {
                select: { description: true },
            },
            userType: true,
            link: true,
            phone: true,
            profile: true,
        },
        where: {
            id,
            isDeleted: false,
            userType: {
                in: ["CHECKER", "TRACKER", "USER"],
            },
        },
    });

    if (!result) {
        notFound();
    }
    //PARSE IMAGE
    let parseImage = null;
    if (result.profile) {
        parseImage = await sharp(result.profile).resize(125, 125).toBuffer(); //REDUCE IMAGE SIZE
    }
    //
    const parsed = {
        id: result.id,
        fname: result.fname,
        mname: result.mname,
        lname: result.lname,
        suffix: result.suffix,
        fullname: fullname(
            { fname: result.fname, mname: result.mname, lname: result.lname, suffix: result.suffix },
            true
        ), //SET FULLNAME
        link: result.link,
        email: result.email,
        phone: result.phone,
        profile: parseImage ? `${parseImage?.toString("base64")}` : null,
        department: result.department?.description,
        departmentId: result.departmentId,
        section: result.section?.description,
        sectionId: result.sectionId,
        userType: result.userType,
        username: result.username,
    };

    return parsed;
};

//FETCH USER PURCHASE REQUESTS

import { toListLimited } from "@lib/intl/list";

export const fetchUserPurchaseRequest = async (id: string) => {
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
                    particulars: true,
                },
                where: {
                    isDeleted: false,
                },
                take: 10, //? take 10 only
                orderBy: {
                    updatedAt: "desc",
                },
            },
        },
        where: {
            id,
            isDeleted: false,
        },
    });
    const parse = await Promise.all(
        (result?.pr as Array<{ particulars: any[] }>).map((item) => {
            const descriptions = item.particulars.map((item: { description: string }) => item.description);
            return {
                ...item,
                particulars: toListLimited(descriptions, 3),
            };
        })
    );

    return parse;
};

//FETCH DEPARTMENTS

export const fetchOfficeDesignation = async () => {
    const departments = await db.departments.findMany({
        select: {
            description: true,
            id: true,
        },
        where: {
            isDeleted: false,
        },
    });

    //map result
    const officeDesignate = await Promise.all(
        departments.map(async (item) => {
            const sections = await db.sections.findMany({
                select: { description: true, id: true },
                where: { departmentId: item.id, isDeleted: false },
            });
            const mapped = sections.map((section) => ({ label: section.description, value: section.id }));
            if (sections.length > 0) {
                mapped.unshift({ label: "None", value: "" });
            }
            return {
                label: item.description,
                value: item.id,
                children: mapped,
            };
        })
    );

    return officeDesignate;
};