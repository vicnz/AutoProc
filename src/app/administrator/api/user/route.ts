import { NextRequest } from "next/server";
import { handleManyUserGet, handleUserGetPickOnly } from './utility'

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    if (searchParams.get('all') === 'true') {
        return await handleManyUserGet(req)
    } else if (searchParams.get('pick_only') === 'true') {
        return await handleUserGetPickOnly(req)
    }
}


export const POST = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams

}