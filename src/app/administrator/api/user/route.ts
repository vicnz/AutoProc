import { NextRequest, NextResponse } from "next/server";

import mockdata from './data.test'

export const GET = async function (req: NextRequest) {
    const { searchParams } = new URL(req.url)

    if (searchParams.get('reqtype') === 'selection') {
        let metaData = mockdata.map(
            item => (
                {
                    id: item.id,
                    name: `${item.fname} ${item.mname !== null ? item.mname.substring(0, 1) + '. ' : ''}${item.lname}`,
                    departmentId: item.departmentId
                }
            )
        )
        return NextResponse.json(metaData)
    }

    // NextResponse.json({})
}