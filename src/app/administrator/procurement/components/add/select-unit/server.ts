'use server';
import db from '@lib/db'

export const getUnit = async function () {
    try {
        const result = await db.units.findMany({
            where: { isDeleted: false }
        })
        return result
    } catch (err) {
        console.log(err)
        return []
    }
}