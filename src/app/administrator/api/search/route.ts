export const revalidate = 0;
import { NextRequest, NextResponse } from 'next/server'
import { searchRecords, searchSuppliers, searchUsers } from './utility'

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    try {
        if (searchParams.has('q')) {
            let query = searchParams.get('q')
            if (searchParams.has('type')) {
                const type = searchParams.get('type')
                query = query || '&$' //trigger an empty result
                switch (type) {
                    case 'records':
                        const records = await searchRecords(query)
                        return NextResponse.json({
                            records
                        })
                    case 'users':
                        const users = await searchUsers(query)
                        return NextResponse.json({ users })
                    case 'suppliers':
                        const suppliers = await searchSuppliers(query)
                        return NextResponse.json({ suppliers })
                    default:
                        return NextResponse.json({ empty: true })
                }
            } else {
                //fetch all instances - limit to 10
                query = query || '&%' //ampersand to return 0 result if query is empty
                const [records, users, suppliers] = await Promise.all([searchRecords(query), searchUsers(query), searchSuppliers(query)])

                return NextResponse.json({
                    records,
                    users,
                    suppliers
                })
            }
        } else {
            return NextResponse.json({ empty: true })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: true })
    }
}
