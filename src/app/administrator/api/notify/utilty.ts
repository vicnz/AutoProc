import db from '@lib/db'
import dayjs from 'dayjs'

//TODO -> find delays even when the eventsource is not running
//TODO -> Migrate this mutation in Database Triggers
export const NotifyOutdateDelivery = async (trace_date: string) => {
    //LookUP Deliveries
    const lookupNewDelays = await db.delivery.findFirst({
        where: {
            endDate: {
                lte: dayjs(trace_date).toISOString()
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    //if there is new untraced delays
    if (lookupNewDelays) {
        //check if the detected delivery exists already
        const existsInNotification = await db.notifications.findFirst({
            where: {
                resolved: false,
                source: {
                    equals: lookupNewDelays.id
                }
            }
        })
        //add new notification item
        if (existsInNotification === null) {
            const getPR = await db.purchase_orders.findFirst({
                select: {
                    id: true,
                    number: true,
                    pr: {
                        select: {
                            number: true,
                            id: true
                        }
                    }
                },
                where: {
                    id: lookupNewDelays.poId
                }
            })

            const result = await db.notifications.create({
                data: {
                    source: lookupNewDelays.id,
                    title: "Delayed Item Detected",
                    description: `Delayed Delivery For Purchase Order #${getPR?.number}`,
                    content: {
                        type: 'pr',
                        refId: getPR?.pr?.id
                    }
                },
                select: {
                    title: true,
                    description: true,
                    id: true,
                    level: true,
                    content: true
                }
            })
            return result;
        }
        return;
    }

    return;
}