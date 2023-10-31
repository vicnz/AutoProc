import type { IParticulars } from './types'
//compute particulars
export const computeParticulars = (particulars: IParticulars[]) => {
    return particulars.map((item) => {
        const totalPrice = item.price * item.qty;
        return { ...item, key: item.description, total: totalPrice };
    });
}