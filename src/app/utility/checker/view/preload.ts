import db from "@lib/db"
import dayjs from "dayjs"

export const preload = async (id: string) => {
    if (typeof id === 'undefined' || id === null || id === "") return { error: true }
    try {
        const delivery = await db.delivery.findFirst({
            select: {
                id: true,
                startDate: true,
                endDate: true,
                parcels: true,
                final: true,
                po: {
                    select: {
                        supplier: true,
                        number: true,
                    }
                }
            },
            where: {
                id
            }
        })

        if (!delivery) return { error: true }
        const [status, progress] = await computeDelivery(delivery.parcels as ParcelItem[], delivery.endDate)
        const parsed = {
            id: delivery.id,
            number: delivery.po.number,
            supplier: delivery.po.supplier,
            startDate: delivery.startDate,
            endDate: delivery.endDate,
            parcels: delivery.parcels,
            final: delivery.final,
            completed: false,
            progress: progress,
            status: status,
        }

        return parsed
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}

export const computeDelivery = async (parcel: ParcelItem[], endDate: Date) => {
    const checkCompleted = await Promise.all(
        parcel.map(async (item) => {
            // item.verified.aligned && item.verified.quality && item.verified.count === item.qty
            const accounted = new Array(item.qty).fill(false).fill(true, 0, item.verified.count)
            return [...accounted, item.verified.aligned, item.verified.quality,/*item.verified.count === item.qty*/];
        })
    );

    const status = checkCompleted.flat().filter((item) => item).length / checkCompleted.flat().length;
    const deliveryProgress = Math.floor(status * 100);

    let deliveryStatus = "";
    if (dayjs(endDate) <= dayjs()) {
        deliveryStatus = `${Math.abs(dayjs(endDate).diff(dayjs(), "day"))} Day(s) Delayed`;
    } else {
        deliveryStatus = `${Math.abs(dayjs(endDate).diff(dayjs(), "day"))} Day(s) Remaining`;
    }

    return [deliveryStatus, deliveryProgress]
}


export type ParcelItem = {
    verified: any;
    qty: number;
    completed: boolean;
};
