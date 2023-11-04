import db from '@lib/db'
import { ClientError } from '@lib/server/client-error'
import { logger } from '@logger'
import { NextRequest, NextResponse } from 'next/server'

export const getPickedDepartments = async (req: NextRequest) => {
    try {
        const result = await db.departments.findMany({
            select: {
                description: true,
                id: true,
            },
            where: {
                isDeleted: false,
            },
            orderBy: {
                description: 'asc'
            }
        })

        return NextResponse.json(result)
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message)
        }
        if (err instanceof ClientError) {
            return new Response(JSON.stringify({ message: err.message, type: err.type }), { status: err.status })
        }
        return new Response(JSON.stringify({ error: true }), { status: 500 })
    }
}

export const getPickedSections = async (req: NextRequest, deptId: string | null | undefined) => {
    try {
        const result = await db.sections.findMany({
            select: {
                description: true,
                id: true,
            },
            where: {
                isDeleted: false,
                departmentId: deptId
            },
            orderBy: {
                description: 'asc'
            }
        })

        return NextResponse.json(result)

    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message)
        }
        if (err instanceof ClientError) {
            return new Response(JSON.stringify({ message: err.message, type: err.type }), { status: err.status })
        }
        return new Response(JSON.stringify({ error: true }), { status: 500 })
    }
}