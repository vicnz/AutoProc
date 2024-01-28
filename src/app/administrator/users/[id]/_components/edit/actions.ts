'use server';
import sharp from "sharp";
import db, { PrismaModels } from '@lib/db'
import { randomRange } from "@lib/client/random-range";
import { hashPassword } from "@lib/server/password-hash";
import { revalidatePath } from "next/cache";

//ADD NEW USER
type UserInfo = Partial<PrismaModels['users'] & { office: string }>
export async function saveNewUser(formData: FormData) { //TODO convert FORMDATA to JSON OBJECT
    const data: UserInfo = Object.fromEntries(formData)

    const _office = data.office?.split(",") as string[]
    const dept = _office[0]
    const sect = _office[1]

    let profile = null
    if (data.profile) {
        //@ts-ignore
        profile = new Blob([data.profile], { type: data.profile.type })
        const image = sharp(await profile.arrayBuffer())
        profile = await image.resize(300, 300).toBuffer()
    }

    const _userData: UserInfo = {
        fname: data.fname,
        mname: data.mname !== "" ? data.mname : null,
        lname: data.lname,
        suffix: data.suffix !== "" ? data.suffix : null,
        departmentId: dept,
        sectionId: sect || null,
        userType: data.userType,
        phone: data.phone !== '' ? data.phone : null,
        link: data.link !== '' ? data.link : null,
        email: data.email,
        profile: profile as any
    }

    try {
        await db.users.create({
            data: {
                ..._userData as any,
                password: await hashPassword(_userData.email as string || (_userData.fname as string).replace(" ", "_")), //?generate a mock password | available on AutoProc V2
                username: `${(_userData.fname as string).toLowerCase().replace(" ", "_")}${randomRange(10, 100)}`, //?generate this | available on AutoProc V2   
            },
        })

        revalidatePath('/administrator/new-user')

    } catch (err) {
        console.log(err)
        return { error: true }
    }
}


//UPDATE USER

export async function updateNewUser(formData: FormData) {
    const data: UserInfo = Object.fromEntries(formData)

    const office = data.office?.split(",") as string[]
    const dept = office[0]
    const sect = office[1]



    const userData: UserInfo = {
        id: data.id,
        fname: data.fname,
        mname: data.mname !== "" ? data.mname : null,
        lname: data.lname,
        suffix: data.suffix !== "" ? data.suffix : null,
        departmentId: dept,
        sectionId: sect || null,
        userType: data.userType,
        phone: data.phone !== '' ? data.phone : null,
        link: data.link !== '' ? data.link : null,
        email: data.email,
    }
    //@ts-ignore
    if (typeof data.profile !== 'undefined' && data?.profile !== null && data?.profile !== "") {
        //@ts-ignore
        let file = new Blob([data.profile])
        //@ts-ignore
        const image = sharp(await data?.profile.arrayBuffer())
        //@ts-ignore
        file = await image.resize(300, 300).toBuffer()
        userData.profile = file as any;
    }

    try {
        await db.users.update({
            data: {
                ...userData as any,
                // password: await hashPassword(_userData.email as string || (_userData.fname as string).replace(" ", "_")), //?generate a mock password | available on AutoProc V2
                // username: `${(_userData.fname as string).toLowerCase().replace(" ", "_")}${randomRange(10, 100)}`, //?generate this | available on AutoProc V2   
            },
            where: {
                id: userData.id
            }
        })
        revalidatePath(`/administrator/users/${userData.id}`);
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}
