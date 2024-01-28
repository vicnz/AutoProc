export const revalidate = 0;
import { NextRequest } from "next/server";
import { handleManyUserGet, handleUserGetPickOnly } from './utility'

/**
 * * FETCH USERS OR USERS ONLY FOR PICKING
 */
export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    if (searchParams.get('all') === 'true') {
        return await handleManyUserGet(req)
    } else if (searchParams.get('pick_only') === 'true') {
        return await handleUserGetPickOnly(req)
    }
}
