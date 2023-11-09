import db from "@lib/db";

export const preload = async () => {
    //TODO paginate
    //TODO inquire supplier rating and status
    const result = await db.suppliers.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return result;
};