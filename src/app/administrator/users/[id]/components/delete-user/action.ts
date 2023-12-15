'use server';
import db from '@lib/db'
import { revalidatePath } from 'next/cache';

export const deleteUser = async (id: string) => {
    try {
        await db.users.update({
            data: {
                isDeleted: true,
            },
            where: {
                id
            }
        })
        revalidatePath('/administrator/users')
        return { ok: true }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}