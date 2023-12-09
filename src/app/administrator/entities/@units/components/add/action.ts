'use server';

import { formToObject } from "@lib/converters/formData";
import db, { PrismaClientError } from "@lib/db";
import { revalidatePath } from "next/cache";

export const addUnit = async (formData: FormData) => {
    try {
        const object = formToObject(formData)
        await db.units.create({
            data: {
                id: object.id,
                name: object.name,
            },
        });

        revalidatePath("/administrator/entities");
        return { ok: true };
    } catch (err) {
        console.error(err)
        if (err instanceof PrismaClientError) {
            if (err.code === 'P2002') {
                return { error: true, message: 'Duplicate Office, Matching Office Code to an Existing Office' }
            }
            return { error: true, message: 'database error' }
        }
        return { error: true };
    }
};