import fullname from '@lib/client/fullname'
import db from '@lib/db'
import sharp from 'sharp'

export const getAdminInfo = async (id: string) => {
    try {
        const admin = await db.users.findFirst({
            select: {
                id: true,
                fname: true,
                mname: true,
                lname: true,
                suffix: true,
                email: true,
                username: true,
                phone: true,
                link: true,
                profile: true
            },
            where: {
                id,
            }
        })

        if (admin) {
            const thumbnail = admin.profile ? await sharp(admin.profile).resize({ height: 300, width: 300 }).toBuffer() : null
            return {
                profile: {
                    ...admin,
                    profile: thumbnail ? thumbnail.toString('base64') : null,
                    fullname: fullname({ fname: admin.fname, mname: admin.mname, lname: admin.lname, suffix: admin.suffix }, true)
                }
            }
        } else {
            return { error: true, message: 'None Existing Administrator ID' }
        }
    } catch (err) {
        return { error: true, message: "Server Error" }
    }
}

///

export const getSettingsInfo = async () => {
    try {
        const settings = await db.settings.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                value: true
            }
        })

        return { settings };
    } catch (err) {
        console.log(err) //
        return { error: true }
    }
}
