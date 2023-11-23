import fullname from '@lib/client/fullname'
import db from '@lib/db'
import _ from 'lodash'
import { notFound } from 'next/navigation'
import sharp from 'sharp'

export const fetchAccountInfo = async (id: string) => {
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
                isDeleted: false //this is already determined on login
            }
        })

        if (admin) {
            return {
                profile: {
                    ...admin,
                    profile: admin.profile ? await sharp(admin.profile).resize({ height: 300, width: 300 }).toBuffer() : null,
                    fullname: fullname({ fname: admin.fname, mname: admin.mname, lname: admin.lname, suffix: admin.suffix }, true)
                }
            }
        } else {
            notFound()
        }
    } catch (err) {
        notFound()
    }
}

