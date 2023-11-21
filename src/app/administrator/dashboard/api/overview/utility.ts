interface CostType {
    particulars: Array<{ total: number }>
}

export const computeTotal = async (cost: CostType[]) => {
    return new Promise((res, rej) => {
        let subTotal = 0;
        cost.forEach((item) => {
            let total = 0;
            item.particulars.forEach((parcel) => {
                total += parcel.total
            })
            subTotal += total;
        })

        return res(subTotal)
    })

}