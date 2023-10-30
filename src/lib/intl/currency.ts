
/**
 * * INTL Formating Collection
 * * CURRENCY
 */

export const ToPeso = function (currency: number) {
    return Intl.NumberFormat('en', { style: 'currency', currency: 'PHP' }).format(currency)
}
