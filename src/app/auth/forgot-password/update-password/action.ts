'use server';

import { formToObject } from '@lib/converters/formData'
import { hashPassword } from '@lib/server/password-hash';
import db from '@lib/db';
import { verify } from 'jsonwebtoken';

export const updatePassword = async (formData: FormData) => {
    try {
        const object: { userId: string, password: string, token: string } = formToObject(formData)

        //Verify
        const decoded: any = verify(object.token, process.env.JWT_SECRET as string);
        if (decoded?.exp < Math.floor(Date.now() / 1000)) {
            throw "Token Expired";
        }

        const userInfo = await db.users.findFirst({
            select: {
                id: true,
                password: true,
            },
            where: {
                id: object.userId
            }
        })

        if (!userInfo) throw "User Does Not Exist";
        const hashed = await hashPassword(object.password)
        await db.users.update({
            data: {
                password: hashed
            },
            where: {
                id: object.userId,
            }
        })
        return { ok: true }
    } catch (err) {
        console.log(err)
        return { error: true, message: "Server Error" }
    }
}