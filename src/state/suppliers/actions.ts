'use server';

import db, { PrismaModels } from '@lib/db'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * * UPDATE SUPPLIER INFORMATION
 */
type SupplierData = Partial<PrismaModels['suppliers']>
export const updateSupplier = async (formData: any) => {
    try {

        const data = JSON.parse(formData)
        const SupplierSchema: SupplierData = { ...data }

        await db.suppliers.update({
            data: SupplierSchema,
            where: {
                id: SupplierSchema.id
            }
        })

        revalidatePath(`/administrator/suppliers/${SupplierSchema.id}`)
    } catch (err) {
        console.log(err)
        return { error: true }
    }
    // revalidatePath(`/administrator/suppliers/${SupplierSchema.id}`)
    // redirect('/administrator/supplier')
}

/**
 * * CREATE NEW SUPPLIER
 */
type SupplierDataRequired = Required<PrismaModels['suppliers']>
export const addNewSupplier = async (formData: any) => {
    try {
        const data = JSON.parse(formData)
        const SupplierSchema: SupplierDataRequired = { ...data }
        await db.suppliers.create({
            data: SupplierSchema
        })
        revalidatePath(`/administrator/suppliers`)
    } catch (err) {
        return { error: true }
    }
}