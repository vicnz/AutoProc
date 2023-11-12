import db from "@lib/db"

export const searchRecords = async (query: string) => {
    const result = await db.purchase_requests.findMany({
        select: {
            id: true,
            number: true,
            reference: true,
        },
        where: {
            //TODO include Particulars as Searchable Object
            number: {
                search: `${query}`
            },
            reference: {
                search: `${query}`
            },
            isDeleted: false,
        },
        take: 10,
    })

    return result;
}

//
export const searchUsers = async (query: string) => {
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
        take: 10,
    })

    return result;
}


export const searchSuppliers = async (query: string) => {
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
        }
    })

    return result;
}