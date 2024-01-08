import { schedule } from "node-cron";
import dayjs from "dayjs";
import db, { PrismaModels } from "@lib/db";
import { logger } from "@logger";

const interval = `* * * * *`; //every 1 Minute check for Incoming Delayed Deliveries
export async function MonitorDeliveries() {
    logger.info("Initialed Monitoring Delayed Deliveries")

    const setting = await db.settings.findFirst({
        select: { value: true },
        where: { name: 'notice' }
    })

    const monitorSchedule = schedule(interval, async (now) => {

        const nowDate = dayjs(now).add(Number(setting?.value) || 3, "days").toISOString(); //days before notifying user of incoming delays

        //? 🧪 USE [NOW] WHEN IN DEMO AND [NOWDATE] WHEN IN DEPLOYMENT 🔥🔥🔥🔥🔥🔥🔥🔥

        const result = await db.delivery.findMany({
            include: {
                po: {
                    select: {
                        prId: true,
                        number: true,
                    },
                },
            },
            where: {
                endDate: {
                    //! CHANGE NOW DATE ON DEPLOYMENT
                    lte: dayjs(now).toISOString(),
                    //! CHANGE NOW DATE ON DEPLOYMENT
                    gte: dayjs(now).subtract(60, "seconds").toISOString(),
                },
                final: false,
            },
            orderBy: {
                createdAt: "desc",
            },
            distinct: "poId",
            take: 5, //! APPROXIMATION OF DELAYED DELIVERIES EVERY MINUTE
        });

        //TODO update notification schema structure for notifications
        const appendToNotifications = result?.map((item: PrismaModels["delivery"] & { po: { prId: string, number: string } }) => {
            return {
                title: "Incoming Deadline For Delivery",
                read: false,
                description: `Incoming Deadline For Purchase Order Number ${item.po.number}, ${Number(setting?.value || 3)} Days from now ${dayjs().format('MMM DD, YYYY')}`,
                resolved: false,
                source: item.poId,
                id: item.poId,
                content: { type: "delivery", ref: item.po.prId },
                type: "delivery",
            };
        });

        await db.notifications.createMany({
            data: appendToNotifications,
            skipDuplicates: true, //remove duplicates
        });

    });

    return monitorSchedule;
}
