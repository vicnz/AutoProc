import db, { PrismaModels } from '@lib/db'
import dayjs from 'dayjs'

/**
 * * TIMELY FETCH ANY NEW NOTIFICATIONS EVERY MINUTE
 * * RETURN TITLE, DESCRIPTION
 */
export const DetectNewNotifications = async () => {
    //FETCH
    const new_notif = await db.notifications.findMany({
        where: {
            createdAt: {
                lte: dayjs().toISOString(),
                gte: dayjs().subtract(1, 'minute').toISOString()
            },
            read: false,
            resolved: false
        }
    })

    if (new_notif && new_notif.length > 0) {
        return new_notif.map(item => {
            const props: Pick<PrismaModels['notifications'], 'title' | 'description'> = item
            return props;
        })
    }
}