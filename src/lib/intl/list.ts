const ListFormatter = new Intl.ListFormat("en")

export function toList(list: any[],) {
    return ListFormatter.format(list)
}