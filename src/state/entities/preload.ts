import db from "@lib/db"

export const fetchDepartments = async () => {
    try {
        const data = await db.departments.findMany({
            select: {
                id: true,
                description: true,
                name: true,
                _count: {
                    select: {
                        sections: true
                    }
                }
            },
            where: {
                isDeleted: false,
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return data;
    } catch (err) {
        console.log(err)
        //TODO handle error
        throw "An Error Occured"
    }
}

export const fetchDepartmentsWithSection = async () => {
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

        return parsed;

    } catch (err) {
        console.log(err)
        throw "Error"
    }
}

//TODO add type on units editor
//types length, area, mass, volume, item
export const fetchUnits = async () => {
    try {
        const result = await db.units.findMany({
            select: {
                id: true,
                name: true, //short name
            }
        })
        return result;
    } catch (err) {
        console.log(err)
        throw "error"
    }
}

//TODO delete fetch Sections
export const fetchSections = async () => {
    try {
        const data = await db.sections.findMany({
            select: {
                id: true,
                description: true,
                name: true,
                department: {
                    select: {
                        description: true
                    }
                },
                departmentId: true
            },
            where: {
                isDeleted: false
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return data;
    } catch (err) {
        //TODO handle error
        console.log(err)
        throw "error"
    }
}