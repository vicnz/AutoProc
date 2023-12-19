import Card from './card'
import db from '@lib/db'

const preload = async () => {
    const response = await db.officers.findMany({ where: { isDeleted: false } })

    if (!(response.length > 0)) {
        throw new Error("No Officers")
    }

    let members: any[] = []
    let chairman: any = {}
    let vice: any = {}
    let head: any = {}

    response.forEach((item: { position: string }) => {
        if (item.position === 'VICE') vice = { ...item }
        if (item.position === 'HEAD') head = { ...item }
        if (item.position === 'CHAIR') chairman = { ...item }
        if (item.position === 'MEMBER') members.push(item)
    })

    return { members, chairman, vicechairman: vice, head }
}
async function Officers() {
    const response = await preload()
    return (
        <Card data={response} />
    );
}

export default Officers;
