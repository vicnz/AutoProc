'use server';
import db from '@lib/db'
import { revalidatePath } from 'next/cache';

export const deleteSupplier = async (id: string) => {
    try {
        await db.suppliers.update({
            data: {
                isDeleted: true,
            },
            where: {
                id
            }
        })
        revalidatePath('/administrator/suppliers')
        return { ok: true }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}