import db from "@lib/db"

export const fetchDepartmentsWithSection = async () => {
    const departments = await db.departments.findMany({
        select: {
            description: true,
            id: true,
        },
        where: {
            isDeleted: false,
        },
    });

    //map result
    const officeDesignate = await Promise.all(
        departments.map(async (item) => {
            const sections = await db.sections.findMany({
                select: { description: true, id: true },
                where: { departmentId: item.id, isDeleted: false },
            });
            const mapped = sections.map((section) => ({ label: section.description, value: section.id }));
            if (sections.length > 0) {
                mapped.unshift({ label: "None", value: "" });
            }
            return {
                label: item.description,
                value: item.id,
                children: mapped,
            };
        })
    );

    return officeDesignate;
};