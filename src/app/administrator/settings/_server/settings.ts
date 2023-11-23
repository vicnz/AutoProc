import db from '@lib/db'
import { notFound } from 'next/navigation'

export const fetchSettings = async () => {
    try {
        const settings = await db.settings.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                value: true
            }
        })

        return { settings };
    } catch (err) {
        console.log(err) //
        notFound()
    }
}