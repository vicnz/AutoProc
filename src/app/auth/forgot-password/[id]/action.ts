'use server';

import { formToObject } from "@lib/converters/formData";
import db from "@lib/db";
import { sign, verify } from 'jsonwebtoken'

export const verifyAnswer = async (formData: FormData) => {
    try {
        const ans: { id: string, key: string, answer: string } = formToObject(formData)
        const answer = await db.security_answers.findFirstOrThrow({
            select: {
                id: true,
            },
            where: {
                AND: [
                    {
                        answers: {
                            path: "$." + ans.key + ".answer",
                            equals: ans.answer,
                        },
                    },
                    {
                        id: ans.id
                    }
                ]
            }
        })
        if (answer) {
            return { ok: true }
        } else {
            throw "No Answer"
        }
    } catch (err) {
        return { error: true, message: "Invalid Answer" }
    }
}

export const genAccessKey = async (formData: FormData) => {
    try {
        const payload: { id: string, userid: string } = formToObject(formData)
        const load = {
            ...payload,
            exp: Math.floor(Date.now() / 1000) + (60 * 5), // 5 minutes from now
        };
        const genAccessKey = sign(load, process.env.JWT_SECRET as string)

        return { ok: true, token: genAccessKey }
    } catch (err) {
        return { error: true, message: "Invalid Answer" }
    }
}