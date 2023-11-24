const ListFormatter = new Intl.ListFormat("en")


export function toList(list: any[],) {
    return ListFormatter.format(list)
}

export function toListLimited(list: any[], limit: number) {
    const formated = list.slice(0, limit)
    if (limit < list.length) {
        formated.push("etc.")
    }

    return ListFormatter.format(formated)
}