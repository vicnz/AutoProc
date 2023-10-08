//@ts-nocheck
//Convert Number to WORDS
export function numberToWords(n) {
    const arr = (x) => Array.from(x)
    const num = (x) => Number(x) || 0
    const str = (x) => String(x)
    const isEmpty = (xs) => xs.length === 0
    const take = (n) => (xs) => xs.slice(0, n)
    const drop = (n) => (xs) => xs.slice(n)
    const reverse = (xs) => xs.slice(0).reverse()
    const comp = (f) => (g) => (x) => f(g(x))
    const not = (x) => !x
    const chunk = (n) => (xs) => isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))]

    let numToWords = (n) => {
        let a = [
            '',
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine',
            'ten',
            'eleven',
            'twelve',
            'thirteen',
            'fourteen',
            'fifteen',
            'sixteen',
            'seventeen',
            'eighteen',
            'nineteen'
        ]

        let b = [
            '', '',
            'twenty',
            'thirty',
            'fourty',
            'fifty',
            'sixty',
            'seventy',
            'eighty',
            'ninety'
        ]

        let g = [
            '',
            'thousand',
            'million',
            'billion',
            'trillion',
            'quadrillion',
            'quintillion',
            'sextillion',
            'septillion',
            'octillion',
            'nonillion'
        ]

        let makeGroup = ([ones, tens, huns]) => {
            return [
                num(huns) === 0 ? '' : a[huns] + ' hundred ',
                num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
                a[tens + ones] || a[ones]
            ].join('')
        }

        let thousand = (group, i) => group === '' ? group : `${group} ${g[i]}`

        if (typeof n === 'number') return numToWords(String(n));
        else if (n === 0) return 'zero';
        else return comp(chunk(3))(reverse)(arr(n))
            .map(makeGroup)
            .map(thousand)
            .filter(comp(not)(isEmpty))
            .reverse()
            .join(' ')
    }

    return numToWords(n)
}

//Convert Number With Decimal
function main(n) {
    const integerPart = Math.floor(n)
    const decimalPart = Math.round((n - integerPart) * 100)

    const integerWord = numberToWords(integerPart)
    const decimalWord = numberToWords(decimalPart)

    if (decimalWord.length === 0) {
        return `${integerWord}`
    } else {
        return `${integerWord} point ${decimalWord}`
    }
}

export default main;