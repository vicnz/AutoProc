import db from '@lib/db'

export const fetchSetting = async () => {
    try {
        const setting = await db.settings.findFirst({
            select: {
                name: true,
                value: true,
            },
            where: {
                name: 'paginate'
            }
        })

        if (!setting) return { size: 8 }
        return {
            size: Number(setting.value)
        }
    } catch (err) {
        console.log(err) //log this using the official logger
        return { size: 8 }
    }
}