"use server";
import db from '@lib/db'

export const update = async (jsonString: string) => {
    if (jsonString === "") return { error: true };
    try {
        ///
        const data = JSON.parse(jsonString);
        await db.settings.update({
            data: {
                value: data.value.toString()
            },
            where: {
                id: data.id
            }
        })
        ///
    } catch (err) {
        console.log(err)
        return { error: true };
    }
};