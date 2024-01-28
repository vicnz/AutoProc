import db from '@lib/db'

export const adminExists = async () => {
    try {
        const admins = await db.users.count({
            select: {
                id: true
            },
            where: {
                userType: { equals: 'ADMIN' },
                isDeleted: false,
            }
        })

        return admins.id >= 1;

    } catch (err) {
        throw Error("Server Error, Please Try Again")
    }
}