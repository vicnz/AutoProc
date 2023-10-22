import { schedule } from 'node-cron'
import dayjs from "dayjs";
import db from '@lib/db'

/**
 * * DELIVERY MONITORING THIS WILL START WHEN APP IS STARTED ON FIRST RUN
 * * NOTE THIS SCHEDULED TASK WILL BE KEPT ON RUNNING UNTIL THE SERVER
 * * IS [RESTARTED] OR [TERMINATED]
 */

const interval = `*/60 * * * * *` // every 60 seconds / 1 Minute //TODO determine this on database settings
export function MonitorDeliveries() {
    console.log("Delivery Monitoring Started...")
    const notifyBeforeAtDate = 3; //3 days //TODO this value comes from the database settings

    const monitorSchedule = schedule(interval, async (now) => {

        const nowDate = dayjs(now).add(notifyBeforeAtDate, 'days').toISOString() //compute the days before deadline
        const result = await db.delivery.findMany({
            where: {
                endDate: {
                    lte: dayjs(now).toISOString(), //TODO fetch this time range from database
                    gte: dayjs(now).subtract(60, 'seconds').toISOString()
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            distinct: 'poId',
            take: 5 //? APPROXIMATION OF DELAYED DELIVERIES EVERY MINUTE
        })

        console.count(`Found Delayed Item ${result.length}`)

        //TODO add to notification's model
    })
    return monitorSchedule;
}