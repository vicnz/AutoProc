'use server';

import db, { PrismaClientError } from "@lib/db"
import { revalidatePath } from "next/cache"
import { formToObject } from '@lib/converters/formData'

export const addNewSupplier = async (formData: FormData) => {
    try {
        const object = formToObject(formData)
        await db.suppliers.create({
            data: object
        })
        revalidatePath(`/administrator/suppliers`)
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