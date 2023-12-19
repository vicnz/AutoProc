'use server';
import { formToObject } from '@lib/converters/formData';
import db from '@lib/db'
import { revalidatePath } from 'next/cache';

export const updateOfficer = async (formData: FormData) => {
    try {
        const object = formToObject(formData)
        await db.officers.update({
            data: {
                fname: object.fname,
                mname: object.mname,
                lname: object.lname,
                suffix: object.suffix
            },
            where: {
                id: object.id
            }
        })
        revalidatePath('/administrator/entities/officers');
        return { ok: true }
    } catch (err) {
        return {
            error: true
        }
    }
}
export const addOfficer = async (formData: FormData) => {
    try {
        const object = formToObject(formData)
        await db.officers.create({
            data: {
                fname: object.fname,
                mname: object.mname,
                lname: object.lname,
                suffix: object.suffix,
                title: object.title,
                position: 'MEMBER'
            }
        })
        revalidatePath('/administrator/entities/officers');
        return { ok: true }
    } catch (err) {
        return {
            error: true
        }
    }
}

export const removeOfficer = async (id: string) => {
    try {
        await db.officers.delete({
            where: {
                id
            }
        })
        revalidatePath('/administrator/entities/officers');
        return { ok: true }
    } catch (err) {
        return {
            error: true
        }
    }
}