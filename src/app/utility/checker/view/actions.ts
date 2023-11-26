'use server';
import db from "@lib/db";

export const action = async (data: string) => {
    if (typeof data === 'undefined' || data === null || data === "") return { error: true };

    try {
        const parsed: any = JSON.parse(data)
        const { parcels, id } = parsed;
        const parcelChecked = await checkForCompleteFn(parcels as ParcelItem[]);

        await db.delivery.update({
            data: {
                parcels: parcelChecked,
            },
            where: {
                id: id,
            },
        });
        return { ok: true }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}

export type ParcelItem = {
    verified: any;
    qty: number;
    completed: boolean;
};
// ─── Check For Completed Deliveries ──────────────────────────────────────────
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