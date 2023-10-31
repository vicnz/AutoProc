import type { IParticularItem } from './type'
export const parseParticulars = async (particulars: IParticularItem[]) => {
    let countTotal = 0;
    const mapped = particulars.map((item, idx) => {
        countTotal += item.price * item.qty
        return ({ ...item, key: idx + 1 })
    })
    return [countTotal, mapped]
}