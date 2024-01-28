'use server';
import db from '@lib/db'
import { sign } from '@lib/server/jwt'


export const generateTracking = async (payload: { id: string }) => {
    try {
        if (!payload.id) throw "No ID"
        const expDays = 7 //TODO set this in settings

        const prInfo = await db.purchase_requests.findFirstOrThrow({
            select: {
                id: true,
                reference: true,
                number: true
            },
            where: {
                id: payload.id
            }
        })

        const generateValue = sign(prInfo, { expiresIn: `${expDays}d` })

        console.log(generateValue)
        return { token: generateValue, payload: prInfo }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}
