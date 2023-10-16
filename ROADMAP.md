# ROADMAP

## SYSTEM

Are sections that are required to be build and must be finished within the specified timeframe, this features are in the top of the priority list of developed and build features.

1. Develop the Page Layout
    - Design the App Shell
    - Design the Administrator Layout
    - Optimize Layout Performance
    - Separate React `Client Components` and React `Server Components`
2. Logic Building
3. API Endpoints
4. Records View (**Procurement Table View**)
5. Records Item View
6. Monitor Delayed Documents `major`
7. Track Document using the (_final_) value

## FEATURES

Features includes that extra options that the system either requires or additional leverage options to accelerate processes or extra syntactical sugars.

1. VIEW - Purchase Request

2. VIEW - Purchase Request (_recommendation_)

    1. Recommend
    2. Approve

3. VIEW - Purchase Request (_request for price quotation_)

    1. Request For Quotation
    2. Receipt

4. VIEW - Purchase Request (_abstract of quotation_)

5. VIEW - Purchase Request (_awarding_)

    1. Awarding _noted by BAC members_
    2. Awarding _approved by President_
    3. Notice of Award

6. VIEW - Purchase Order

7. CRUD - Purchase Request

8. CRUD - Purchase Request (_request for price quotation_)

9. CRUD - Purchase Request (_abstract of quotation_)

10. CRUD - Purchase Order

11. CRUD Deliveries `major`

12. VIEW Deliveries `major`

13.

14. Purchase Order/Request Number Generator `major`

15. Convert Number to Currency

    > Convert Number to Currency Feature:
    >
    > ```typescript
    > //CONVERT NUMBER TO CURRENCY [NO DECIMALS]
    > function numberToWords(n) {
    >     const arr = (x) => Array.from(x);
    >     const num = (x) => Number(x) || 0;
    >     const str = (x) => String(x);
    >     const isEmpty = (xs) => xs.length === 0;
    >     const take = (n) => (xs) => xs.slice(0, n);
    >     const drop = (n) => (xs) => xs.slice(n);
    >     const reverse = (xs) => xs.slice(0).reverse();
    >     const comp = (f) => (g) => (x) => f(g(x));
    >     const not = (x) => !x;
    >     const chunk = (n) => (xs) => isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];
    >
    >     let numToWords = (n) => {
    >         let a = [
    >             "",
    >             "one",
    >             "two",
    >             "three",
    >             "four",
    >             "five",
    >             "six",
    >             "seven",
    >             "eight",
    >             "nine",
    >             "ten",
    >             "eleven",
    >             "twelve",
    >             "thirteen",
    >             "fourteen",
    >             "fifteen",
    >             "sixteen",
    >             "seventeen",
    >             "eighteen",
    >             "nineteen",
    >         ];
    >
    >         let b = ["", "", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    >
    >         let g = [
    >             "",
    >             "thousand",
    >             "million",
    >             "billion",
    >             "trillion",
    >             "quadrillion",
    >             "quintillion",
    >             "sextillion",
    >             "septillion",
    >             "octillion",
    >             "nonillion",
    >         ];
    >
    >         let makeGroup = ([ones, tens, huns]) => {
    >             return [
    >                 num(huns) === 0 ? "" : a[huns] + " hundred ",
    >                 num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + "-") || "",
    >                 a[tens + ones] || a[ones],
    >             ].join("");
    >         };
    >
    >         let thousand = (group, i) => (group === "" ? group : `${group} ${g[i]}`);
    >
    >         if (typeof n === "number") return numToWords(String(n));
    >         else if (n === 0) return "zero";
    >         else
    >             return comp(chunk(3))(reverse)(arr(n))
    >                 .map(makeGroup)
    >                 .map(thousand)
    >                 .filter(comp(not)(isEmpty))
    >                 .reverse()
    >                 .join(" ");
    >     };
    >
    >     return numToWords(n);
    > }
    > ```
    >
    > ```typescript
    > //Handle Separately decimal points.
    > function main(n) {
    >     const integerPart = Math.floor(n);
    >     const decimalPart = Math.round((n - integerPart) * 100);
    >
    >     const integerWord = numberToWords(integerPart);
    >     const decimalWord = numberToWords(decimalPart);
    >
    >     if (decimalWord.length === 0) {
    >         return `${integerWord}`;
    >     } else {
    >         return `${integerWord} point ${decimalWord}`;
    >     }
    > }
    > ```

16. AutoProc&trade; Utility App

    > The AutoProc&trade; Mobile App, is a UTILITY service app for the autoproc. It purpose is to leverage the idea of tracking routes of documents process, AND utilized for it's `in-developing` Delivery Validator.

    In other words the AutoProc&trade; Utility App has two main features which is the QRCode Scanner for Tracking (_generated by Admin Endpoint_) and it's Validate all Delivery Status.

## STEPS

~ _previous state_
