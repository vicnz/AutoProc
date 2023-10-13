import db from '@lib/db'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

//GET OFFICE LIST
export async function GET(req: NextRequest) {
    try {

        //FETCH OFFICE INFORMATION
        const result = await db.departments.findMany({
            select: {
                id: true,
                name: true,
                description: true,
            },
            where: {
                isDeleted: false
            }
        })

        if (result) {
            return NextResponse.json(result)
        } else {
            return NextResponse.json({ empty: true })
        }
    } catch (err) {
        const response = { message: '', status: 500 }
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                response.message = "Unique Constraint Violation"
            }
        }
        return new Response(response.message, { status: response.status });
    }
}