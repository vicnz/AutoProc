'use server'; //! iTS YOUUU YOU FUCKING MADE ME MISERABLE FOR DAYS.....

import db from '@lib/db'
import { revalidatePath } from 'next/cache';

type IDepartment = {
    id: string,
    name: string, //short name
    description: string //short name
}

export const updateDepartment = async (clientData: any) => {
    try {
        const data: IDepartment = JSON.parse(clientData)
        await db.departments.update({
            data: {
                description: data.description,
                name: (data.name.replace(/[\s_]/, "-")).toUpperCase(),
            },
            where: {
                id: data.id
            }
        })
        revalidatePath('/administrator/entities')
        return { ok: true }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}

export const addDepartment = async (clientData: any) => {
    try {
        const data: IDepartment = JSON.parse(clientData)
        const checkIfExists = await db.departments.findFirst({
            where: {
                name: data.name
            }
        })

        if (!checkIfExists) {
            await db.departments.create({
                data: {
                    name: data.name,
                    description: data.description
                }
            })
        }
        revalidatePath('/administrator/entities')
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}

//Section Management
type ISection = IDepartment & { departmentId?: string }
export const addSection = async (clientData: any) => {
    try {
        const data: ISection = JSON.parse(clientData)
        const checkIfExists = await db.departments.findFirst({
            where: {
                name: data.name
            }
        })
        if (!checkIfExists) {
            await db.sections.create({
                data: {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    departmentId: data.departmentId
                }
            })
        }
        revalidatePath('/administrator/entities')
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}

export const updateSection = async (clientData: any) => {
    try {
        const data: ISection = JSON.parse(clientData)
        await db.sections.update({
            data: {
                description: data.description,
                name: (data.name.replace(/[\s_]/, "-")).toUpperCase(),
            },
            where: {
                id: data.id
            }
        })
        revalidatePath('/administrator/entities')
        return { ok: true }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}

//
export const addUnit = async (clientData: string) => {
    try {
        const data = JSON.parse(clientData);
        const unitExists = await db.units.findFirst({
            where: {
                id: data.id,
            },
        });

        if (!unitExists) {
            await db.units.create({
                data: {
                    id: data.id,
                    name: data.name,
                },
            });
        }

        revalidatePath("/administrator/entities/units"); //TODO optional call
        return { ok: true };
    } catch (err) {
        console.log(err);
        return { error: true };
    }
};

export const deleteUnit = async (id: string) => {
    try {
        const doesExists = await db.units.findFirst({ where: { id } })
        if (doesExists) {
            await db.units.delete({
                where: {
                    id: id
                }
            })
        }
        revalidatePath('/administrator/entities/units')
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}