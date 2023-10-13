export const ToPeso = function (currency: number) {
    return Intl.NumberFormat('en', { style: 'currency', currency: 'PHP' }).format(currency)
}

export const DollarToPeso = function (dollar: number, offset: number) {
    //TODO
}