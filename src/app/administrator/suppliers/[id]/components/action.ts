'use server';

import db, { PrismaClientError, PrismaModels } from '@lib/db'
import { revalidatePath } from 'next/cache';
import { formToObject } from '@lib/converters/formData'

export const updateSupplier = async (formData: FormData) => {
    try {
        const object = formToObject(formData)
        const { id } = object
        await db.suppliers.update({
            data: object,
            where: {
                id
            }
        })

        revalidatePath(`/administrator/suppliers/${id}`)
        return { ok: true }
    } catch (err) {
        console.error(err)
        if (err instanceof PrismaClientError) {
            if (err.code === 'P2002') {
                return { error: true, message: 'Duplicate Supplier, Matching Tin No. to an Existing Supplier' }
            }
            return { error: true, message: 'database error' }
        }
        return { error: true }
    }
}