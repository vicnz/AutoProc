'use server';

import db, { PrismaClientError } from "@lib/db"
import { formToObject } from '@lib/converters/formData'

type UserSchema = {
    username: string,
    id: string,
    fname: string,
    mname?: string,
    lname: string,
    suffix?: string,
    email: string,
    phone?: string,
}

export const updateAdmin = async (formData: FormData) => {
    try {
        const object: UserSchema = formToObject(formData)
        // console.log(object)
        await db.users.update({
            data: {
                username: object.username,
                fname: object.fname,
                mname: object.mname,
                lname: object.lname,
                suffix: object.suffix,
                email: object.email,
                phone: object.phone
            },
            where: {
                id: object.id,
                userType: 'ADMIN'
            }
        })
        return { ok: true }
    } catch (err) {
        console.error(err)
        if (err instanceof PrismaClientError) {
            if (err.code === 'P2002') {
                return { error: true, message: 'Duplicate User, Matching Username or Email to an Existing User' }
            }
            return { error: true, message: 'database error' }
        }
        return { error: true, message: 'server error' }
    }
}