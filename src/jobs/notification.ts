import { schedule } from "node-cron";
import dayjs from "dayjs";
import db, { PrismaModels } from "@lib/db";

// const interval = `*/10 * * * * *`;
const interval = `0 0 1 */1 *`; //every 30 days

export async function NotificationFilter() {

    console.log("Init Notification Filterer .... ");

    const settings = await db.settings.findFirst({
        select: { value: true },
        where: { name: 'notif_clear' }
    })

    /**
     * today - day 30
     * fetch records where create date - end date > 30
     */

    const notifStrip = schedule(interval, async (now) => {

        const belowThirty = dayjs(now).subtract(Number(settings?.value || 30), 'days')

        //DELETE NOTIFICATIONS BELOW THIRTY DAYS
        const result = await db.notifications.deleteMany({
            where: {
                createdAt: {
                    lte: belowThirty.toISOString()
                }
            }
        })

        if (result.count > 0) {
            console.log(`Deleted ${result.count} Notifications...`)
        }
    });
    return notifStrip;
}
