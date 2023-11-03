import { NextRequest } from 'next/server'
import { handleUserGet } from '../utility'

type ParamType = {
    params: {
        id: string
    }
}
//
export const GET = async (req: NextRequest, slug: ParamType) => {
    const { params } = slug
    const searchParams = req.nextUrl.searchParams
    return await handleUserGet(params.id, req)
}

//
export const POST = async (req: NextRequest, slug: ParamType) => {
    const { params } = slug
    const searchParams = req.nextUrl.searchParams


}