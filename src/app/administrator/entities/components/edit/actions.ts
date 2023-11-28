'use server';

import db, { PrismaClientError } from "@lib/db";
import { formToObject } from '@lib/converters/formData'
import { revalidatePath } from "next/cache";


export const updateDepartment = async (formData: FormData) => {
    try {
        const object = formToObject(formData)
        console.log('Department ', object)
        await db.departments.update({
            data: {
                description: object.description,
                name: object.name,
            },
            where: {
                id: object.id
            }
        })
        revalidatePath('/administrator/entities')
        return { ok: true }
    } catch (err) {
        console.error(err)
        if (err instanceof PrismaClientError) {
            if (err.code === 'P2002') {
                return { error: true, message: 'Duplicate Office, Matching Office Code to an Existing Office' }
            }
            return { error: true, message: 'database error' }
        }
        return { error: true }
    }
}

export const updateSection = async (formData: FormData) => {
    try {
        const object = formToObject(formData)
        await db.sections.update({
            data: {
                description: object.description,
                name: object.name
            },
            where: {
                id: object.id
            }
        })
        revalidatePath('/administrator/entities')
        return { ok: true }
    } catch (err) {
        console.error(err)
        if (err instanceof PrismaClientError) {
            if (err.code === 'P2002') {
                return { error: true, message: 'Duplicate Office, Matching Office Code to an Existing Office' }
            }
            return { error: true, message: 'database error' }
        }
        return { error: true }
    }
}