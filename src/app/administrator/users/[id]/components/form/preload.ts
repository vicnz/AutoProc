import db from "@lib/db";
import fullname from "@lib/client/fullname";
import sharp from "sharp";
// ─────────────────────────────────────────────────────────────────────────────
export const fetchOffices = async () => {
    const departments = await db.departments.findMany({
        select: {
            description: true,
            id: true,
            sections: {
                select: { id: true, description: true }
            }
        },
        where: {
            isDeleted: false,
        },
    });

    //map result
    const officeDesignate = await Promise.all(

        departments.map(async (item) => {
            const sections = item.sections.map(section => {
                return {
                    label: section.description,
                    value: section.id
                }
            })
            return {
                label: item.description,
                value: item.id,
                children: sections,
            };
        })
    );

    return officeDesignate;
};
// ─────────────────────────────────────────────────────────────────────────────
export const fetchUser = async (id: string) => {
    try {
        const result = await db.users.findFirst({
            select: {
                id: true,
                email: true,
                username: true, //! AVAILABLE ON AUTO-PROC 2
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

        if (!result) throw "No Result";

        //PARSE IMAGE
        let parseImage = null;
        if (result.profile) {
            parseImage = await sharp(result.profile).resize(125, 125).toBuffer(); //REDUCE IMAGE SIZE
        }

        return {
            id: result.id,
            fname: result.fname,
            mname: result.mname,
            lname: result.lname,
            suffix: result.suffix,
            fullname: fullname(
                { fname: result.fname, mname: result.mname, lname: result.lname, suffix: result.suffix },
                true
            ),
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

    } catch (err) {
        console.log(err)
        return { error: true }
    }
};