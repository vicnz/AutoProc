import db from '@lib/db'

type IDepartment = {
    id: string,
    name: string, //short name
    description: string //short name
}

export const updateDepartment = async (clientData: string) => {
    try {
        const data: IDepartment = JSON.parse(clientData)
        await db.departments.update({
            data,
            where: {
                id: data.id
            }
        })
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}

export const addDepartment = async (clientData: string) => {
    try {
        const data: IDepartment = JSON.parse(clientData)
        await db.departments.create({
            data: {
                name: data.name,
                description: data.name
            }
        })
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}

//Section Management
type ISection = IDepartment & { departmentId?: string }
export const addSection = async (clientData: string) => {
    try {
        const data: ISection = JSON.parse(clientData)
        await db.sections.create({
            data: {
                id: data.id,
                name: data.name,
                description: data.description,
                departmentId: data.departmentId
            }
        })
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}

export const updateSection = async (clientData: string) => {
    try {
        const data: ISection = JSON.parse(clientData)
        await db.sections.update({
            data: {
                name: data.name,
                description: data.description,
            },
            where: {
                id: data.id
            }
        })
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}