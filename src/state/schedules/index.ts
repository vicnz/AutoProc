//NEW IMPEMENTATION

import { schedule } from 'node-cron'
import dayjs from 'dayjs'
import db, { PrismaModels } from '@lib/db'

type NotificationType = PrismaModels['notifications']
const interval = `*/60 * * * * *`; // every 60 seconds / 1 Minute //TODO determine this on database settings

function MonitorDeliveries() {
    console.log("Monitoring Deliveries....")
    const notifyBeforeAtDate = 3 //NOTIFY DELIVERY 3 DAYS BEFORE DEADLINE
    const monitorSchedule = schedule(interval, async (now) => {
        const nowDate = dayjs(now).add(notifyBeforeAtDate, "day").toISOString()
        const result = await db.delivery.findMany({
            select: {
                poId: true,
                po: {
                    select: {
                        prId: true
                    }
                }
            },
            where: {
                endDate: {
                    lte: dayjs(now).toISOString(),
                    gte: dayjs(now).subtract(60, 'seconds').toISOString()
                },
                final: false
            },
            orderBy: {
                createdAt: 'desc'
            },
            distinct: 'poId',
            take: 5
        })

        const appendToNotifications = result?.map((item: Partial<PrismaModels['delivery']> & { po: { prId: string } }) => {
            return {
                title: "Delayed Delivery",
                read: false,
                description: `Delivery Of Purchase Request ID ${item.poId} is delayed...`,
                resolved: false,
                source: item.poId,
                id: item.poId,
                continue: { type: 'delivery', ref: item?.po.prId },
                type: 'delivery'
            }
        })

        await db.notifications.createMany({
            data: appendToNotifications,
            skipDuplicates: true
        })
    })

    monitorSchedule.start() //start monitoring
    return monitorSchedule;
}

//singleton

const runMonitorSingleton = () => {
    return MonitorDeliveries()
}

type RunMonitorSingleton = ReturnType<typeof runMonitorSingleton>

const globalForMonitoring = globalThis as unknown as {
    monitoring: RunMonitorSingleton | undefined
}

const monitoring = globalForMonitoring.monitoring ?? runMonitorSingleton()
export default monitoring;

if ((process?.env?.NODE_ENV) as string !== '') globalForMonitoring.monitoring = monitoring