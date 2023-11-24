import type { IParticulars } from './type'
import { toListLimited } from '@lib/intl/list'

export const parseParticulars = async (result: IParticulars[]) => {
    let total = 0;
    let particulars: string[] | string = [];
    //compute total
    result.forEach((item) => {
        if (Array.isArray(particulars)) {
            particulars.push(item.description);
        }
        total += item.price * item.qty;
    });

    // const ListFormatter = new Intl.ListFormat("en");
    // particulars = ListFormatter.format(particulars);
    particulars = toListLimited(particulars, 4);
    return [total, particulars]
}