import db from "@lib/db"

export const fetchOffices = async () => {
    try {
        const result = await db.departments.findMany({
            select: {
                id: true,
                description: true,
                name: true,
                _count: {
                    select: {
                        sections: true
                    }
                },
                sections: {
                    select: {
                        id: true,
                        description: true,
                        name: true,
                        departmentId: true
                    }
                }
            }
        })

        const parsed = await Promise.all([...result.map(item => {

            let sections = item?.sections.map(sectionItem => {
                return {
                    ...sectionItem,
                    department: item.name,
                    key: sectionItem.id,
                    type: 'section'
                }
            })

            return {
                ...item,
                key: item.id,
                type: 'department',
                children: sections.length > 0 && sections
            }
        })])

        return { data: parsed };
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}