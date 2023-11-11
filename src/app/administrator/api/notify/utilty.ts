import db, { PrismaModels } from '@lib/db'
import dayjs from 'dayjs'

/**
 * * TIMELY FETCH ANY NEW NOTIFICATIONS EVERY MINUTE
 * * RETURN TITLE, DESCRIPTION
 */
export const DetectNewNotifications = async () => {
    const new_notif = await db.notifications.findMany({
        where: {
            createdAt: {
                lte: dayjs().toISOString(),
                gte: dayjs().subtract(3, 'seconds').toISOString() //fetch notification every 10 seconds
            },
            read: false,
            resolved: false
        }
    })

    if (new_notif && new_notif.length > 0) {
        return new_notif.map(item => {
            const { title, description, source, type } = item
            return { title, description, source, type };
        })
    }
}
