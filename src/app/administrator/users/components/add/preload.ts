import db from "@lib/db";

export const fetchOffices = async () => {
    const departments = await db.departments.findMany({
        select: {
            description: true,
            id: true,
            sections: {
                select: { id: true, description: true }
            }
        },
        where: {
            isDeleted: false,
        },
    });

    //map result
    const officeDesignate = await Promise.all(

        departments.map(async (item) => {
            const sections = item.sections.map(section => {
                return {
                    label: section.description,
                    value: section.id
                }
            })
            return {
                label: item.description,
                value: item.id,
                children: sections,
            };
        })
    );

    return officeDesignate;
};