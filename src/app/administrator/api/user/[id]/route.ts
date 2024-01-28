export const revalidate = 0;
/**
 * * USER API
 * * USER [ID] SPECIFIC
 */

import { NextRequest } from 'next/server'
import { handleUserGet, handleUserPost, handleUserPut, handleUserPurchaseRequests } from '../utility'

//types
type ParamType = {
    params: {
        id: string
    }
}
//
//GET RESULT REQUEST
export const GET = async (req: NextRequest, slug: ParamType) => {
    const { params } = slug
    const searchParams = req.nextUrl.searchParams

    if (searchParams.get('purchase_requests') === 'true') {
        //? GET PURCHASE_REQUEST OF THE SELECT USER
        return await handleUserPurchaseRequests(params.id, req)
    }
    return await handleUserGet(params.id, req)
}

//POST / CREATE REQUEST
export const POST = async (req: NextRequest, slug: ParamType) => {
    return await handleUserPost(req)
}

//UPDATE REQUEST
export const PUT = async (req: NextRequest, slug: ParamType) => {
    const { params } = slug
    return await handleUserPut(params.id, req)
}