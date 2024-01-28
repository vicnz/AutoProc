'use server';

import fullname from '@lib/client/fullname';
import db from '@lib/db'
import { query } from 'winston';

export const searchUser = async (param: { limit: number, query: string }) => {
    try {
        if (typeof param.query === 'undefined' || param.query == null || param.query.length < 1) throw new Error("Query Is Empty")
        const result = await db.users.findMany({
            select: {
                id: true,
                fname: true,
                mname: true,
                lname: true,
                suffix: true,
                department: {
                    select: { description: true }
                },
                section: {
                    select: { description: true }
                }
            },
            where: {
                username: {
                    search: `${param.query}`
                },
                email: {
                    search: `${param.query}`
                },
                fname: {
                    search: `${param.query}`
                },
                lname: {
                    search: `${param.query}`
                },
                userType: {
                    in: ['USER']
                },
                isDeleted: false,
            },
            take: param.limit,
        })

        if (result.length < 1) throw "No User Found Of That Information";
        return result.map((item) => {
            return {
                id: item.id,
                name: fullname(
                    {
                        fname: item.fname,
                        mname: item.mname,
                        lname: item.lname,
                        suffix: item.suffix,
                    },
                    true
                ),
                department: item.department?.description,
                section: item.section?.description,
            };
        })
    } catch (err) {
        console.log(err)
        return [];
    }
}