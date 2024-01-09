import db from "@lib/db";

export const preload = async () => {
    try {
        const result = await db.suppliers.findMany({
            select: {
                address: true,
                id: true,
                name: true,
                position: true,
                representative: true,
                tin: true,
                supplier_rating: {
                    select: {
                        delays: true,
                        extends: true,
                        selection: true,
                        onTime: true
                    }
                }
            },

            where: {
                isDeleted: false,
            },
            orderBy: {
                supplier_rating: {
                    selection: 'desc',
                },
            },
        });

        type ResultType = Partial<typeof result[0]> & { delays?: number, onTime?: number, extends?: number, selection?: number };

        const mapped = result.map<ResultType>((item) => {
            return {
                name: item.name,
                id: item.id,
                representative: item.representative,
                tin: item.tin,
                delays: item.supplier_rating?.delays,
                onTime: item.supplier_rating?.onTime,
                extends: item.supplier_rating?.extends,
                selection: item.supplier_rating?.selection
            }
        })

        return { data: mapped }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
};