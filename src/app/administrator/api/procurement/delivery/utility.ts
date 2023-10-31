import dayjs from "dayjs";
import { ParcelItem, ParcelViewItem } from "./type";

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

export const computeParcels = async (parcels: ParcelViewItem[]) => {
    const response = parcels.map((item, idx) => {
        return {
            id: `delivery_id_${idx.toString().padStart(4, "0")}`,
            completed: false,
            description: item.description,
            price: item.price,
            total: item.total,
            qty: item.qty,
            verified: {
                count: 0, //*check the delivered amount
                quality: false, //*check if the product quality is satisfying
                aligned: false, //*if the presented delivered item is aligned with the PR presented
            },
            remarks: null, //checker remarks and stuff
        };
    });

    return response;
}

export const checkForCompleteFn = async (parcels: ParcelItem[]) => {
    const checkForComplete = await Promise.all(parcels.map(async (item) => {
        let isCompleted = false;

        if (item.verified.aligned && item.verified.quality && item.verified.count === item.qty) {
            isCompleted = true;
        }
        return {
            ...item,
            completed: isCompleted,
        };
    })
    );

    return checkForComplete
}