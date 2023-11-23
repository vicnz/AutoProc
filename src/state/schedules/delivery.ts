import { schedule } from "node-cron";
import dayjs from "dayjs";
import db, { PrismaModels } from "@lib/db";

/**
 * * DELIVERY MONITORING THIS WILL START WHEN APP IS STARTED ON FIRST RUN
 * * NOTE THIS SCHEDULED TASK WILL BE KEPT ON RUNNING UNTIL THE SERVER
 * * IS [RESTARTED] OR [TERMINATED]
 */

// ─── Check Ever 1 Minute ─────────────────────────────────────────────────────
const interval = `*/60 * * * * *`;
// ─── Check Ever 1 Minute ─────────────────────────────────────────────────────
export function MonitorDeliveries() {
    console.log(" ─── Delivery Monitoring Started ──────────────────────────────────────");

    const monitorSchedule = schedule(interval, async (now) => {
        const setting = await db.settings.findFirst({
            select: { value: true },
            where: { name: 'notice' }
        })
        // ─── Days Before Notice ──────────────────────────────────────
        const nowDate = dayjs(now).add(Number(setting?.value) || 8, "days").toISOString();
        // ─── Days Before Notice ──────────────────────────────────────

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

        const appendToNotifications = result?.map((item: PrismaModels["delivery"] & { po: { prId: string, number: string } }) => {
            return {
                title: "Incoming Deadline For Delivery",
                read: false,
                description: `Incoming Deadline For Purchase Order Number ${item.po.number}, 3 Days from now ${dayjs().format('MMM DD, YYYY')}`,
                resolved: false,
                source: item.poId,
                id: item.poId,
                content: { type: "delivery", ref: item.po.prId },
                type: "delivery",
            };
        });

        await db.notifications.createMany({
            data: appendToNotifications,
            skipDuplicates: true,
        });
    });
    return monitorSchedule;
}
