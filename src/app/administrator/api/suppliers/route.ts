import prisma from '@lib/db'
import { NextRequest, NextResponse } from 'next/server'


const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)
    try {
        const params = searchParams.get('_id')
        if (params === null) {
            const result = await prisma.suppliers.findMany({
                select: {
                    name: true,
                    id: true
                }
            })

            return NextResponse.json(result || [])
        }

        if (typeof params === 'string') {
            const result = await prisma.suppliers.findFirst({
                select: {
                    name: true,
                    address: true,
                    representative: true,
                    tin: true,
                    id: true
                },
                where: {
                    id: params
                }
            })

            return NextResponse.json(result || {})
        }

    } catch (err) {
        return new Response('', { status: 500 })
    }
}

const POST = async function (req: NextRequest) {

}



export { GET }
