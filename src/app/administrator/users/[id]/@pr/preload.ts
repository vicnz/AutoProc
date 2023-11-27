import db, { PrismaModels } from "@lib/db";
import { toListLimited } from "@lib/intl/list";

export const userPurchases = async (id: string) => {
    try {
        const result = await db.users.findUnique({
            select: {
                pr: {
                    select: {
                        id: true,
                        date: true,
                        final: true,
                        number: true,
                        purpose: true,
                        reference: true,
                        particulars: true,
                    },
                    where: {
                        isDeleted: false,
                    },
                    take: 10, //? take 10 only
                    orderBy: {
                        updatedAt: "desc",
                    },
                },
            },
            where: {
                id,
                isDeleted: false,
            },
        });

        const parse = await Promise.all(
            (result?.pr as Array<{ particulars: any[] }>).map((item) => {
                const descriptions = item.particulars.map((item: { description: string }) => item.description);
                return {
                    ...item,
                    particulars: toListLimited(descriptions, 3),
                };
            })
        );

        // return parse 
        return { data: parse as Partial<PrismaModels['purchase_requests']>[] }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
};