'use server';

import db from '@lib/db'

export const updateSecQuestions = async (formData: string) => {
    try {
        const data: { questions: any, userid: string, id: string } = JSON.parse(formData)
        await db.security_answers.update({
            data: {
                answers: data.questions,
            },
            where: {
                id: data.id,
                userId: data.userid
            }
        })
        return { ok: true }
    } catch (err) {
        console.log(err)
        return { error: true, message: "Server Error" }
    }
}