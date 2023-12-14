'use server';
import db from '@lib/db';

export const globalSearch = async (query: string, queryType?: 'records' | 'suppliers' | 'users') => {
    try {
        const setting = await db.settings.findFirst({
            select: {
                name: true,
                value: true
            },
            where: {
                name: 'search_limit'
            }
        })

        const searchLimit = Number(setting?.value || 10)

        const type = queryType
        if (typeof query === 'undefined' || query == null || query.length < 1) {
            return { empty: true } //return if query does not have a value
        } else {
            switch (type) {
                case 'records':
                    const records = await searchRecords(query, searchLimit)
                    return ({ records })
                case 'users':
                    const users = await searchUsers(query, searchLimit)
                    return ({ users })
                case 'suppliers':
                    const suppliers = await searchSuppliers(query, searchLimit)
                    return ({ suppliers })
                default:
                    const all = await Promise.all([searchRecords(query, searchLimit), searchUsers(query, searchLimit), searchSuppliers(query, searchLimit)])
                    return ({
                        records: all[0],
                        users: all[1],
                        suppliers: all[2]
                    })
            }
        }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}





//Search Procurement Records
const searchRecords = async (query: string, limit: number) => {

    const result = await db.purchase_requests.findMany({
        select: {
            id: true,
            number: true,
            reference: true,
        },
        where: {
            number: {
                search: `${query}`
            },
            reference: {
                search: `${query}`
            },
            isDeleted: false,
        },
        take: limit,
    })

    return result;
}

//Search Users
const searchUsers = async (query: string, limit: number) => {


    const result = await db.users.findMany({
        select: {
            id: true,
            fname: true,
            mname: true,
            lname: true,
            email: true,
        },
        where: {
            //? Available only on AutoProc 2
            username: {
                search: `${query}`
            },
            email: {
                search: `${query}`
            },
            fname: {
                search: `${query}`
            },
            lname: {
                search: `${query}`
            },
            userType: {
                in: ['CHECKER', 'USER', 'TRACKER']
            },
            isDeleted: false,
        },
        take: limit,
    })

    return result;
}

//search suppliers
const searchSuppliers = async (query: string, limit: number) => {

    const result = await db.suppliers.findMany({
        select: {
            id: true,
            name: true,
            representative: true
        },
        where: {
            name: {
                search: `${query}`
            },
            representative: {
                search: `${query}`
            },
            tin: {
                search: `${query}`
            },
            isDeleted: false
        },
        take: limit,
    })

    return result;
}