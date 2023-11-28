'use server';

import db, { PrismaClientError } from "@lib/db";
import { formToObject } from '@lib/converters/formData'
import { revalidatePath } from "next/cache";


export const addDepartment = async (formData: FormData) => {
    try {
        const object = formToObject(formData)
        await db.departments.create({
            data: {
                name: object.name,
                description: object.description
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

export const addSection = async (formData: FormData) => {
    try {
        const object = formToObject(formData)
        await db.sections.create({
            data: {
                name: object.name,
                description: object.description,
                departmentId: object.departmentId
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