'use server';
import { formToObject } from '@lib/converters/formData';
import db from '@lib/db'

export const fetchUserID = async (formData: FormData) => {
    try {
        const object: { username: string, email: string } = formToObject(formData)
        const userID = await db.users.findFirstOrThrow({
            select: {
                id: true,
                email: true
            },
            where: {
                username: { equals: object.username },
                email: { equals: object.email },
                isDeleted: false
            }
        })

        return { ok: true, id: userID.id }
    } catch (err) {
        return { error: true, message: "User Information Not Found" }
    }
}