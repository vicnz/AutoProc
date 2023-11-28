'use server';

import db from "@lib/db"
import { revalidatePath } from "next/cache"

export const deleteUnit = async (id: string) => {
    try {
        const doesExists = await db.units.findFirst({ where: { id } })
        if (doesExists) {
            await db.units.delete({
                where: {
                    id: id
                }
            })
            revalidatePath('/administrator/entities/units')
            return { ok: true }
        } else {
            return { error: true, message: "Unit with Id " + id + " Does not Exist" }
        }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}