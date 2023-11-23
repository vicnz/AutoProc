'use server';

import db from '@lib/db'

//Types
type RequestBody = {
    username: string,
    id: string,
    fname: string,
    mname?: string,
    lname: string,
    suffix?: string,
    email: string,
    phone?: string,
}
//ACTIONS
export const updateAdmin = async (jsonData: string) => {
    if (jsonData === "") return { error: true }
    try {
        const data: RequestBody = JSON.parse(jsonData)
        console.log(data)
        if (typeof data.id === 'undefined') throw "No Value"
        //
        const update = await db.users.update({
            data: {
                username: data.username,
                fname: data.fname,
                mname: data.mname,
                lname: data.lname,
                suffix: data.suffix,
                email: data.email,
                phone: data.phone
            },
            where: {
                id: data.id,
                userType: 'ADMIN'
            }
        })

        return { ok: true }
    } catch (err) {
        console.log(err)
        return { error: true }
    }
}