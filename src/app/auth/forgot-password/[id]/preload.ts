import db from "@lib/db"
import { notFound } from "next/navigation"

type Q = { answer: string, question: string, id: string }

type QuestionSchema = {
    q1: Q,
    q2: Q,
    q3: Q
}

export const preload = async (userid: string) => {
    try {
        const data = await db.security_answers.findFirstOrThrow({
            select: {
                answers: true,
                id: true,
                userId: true
            },
            where: {
                userId: userid,
            }
        })

        const parsed = {
            q1: (data.answers as QuestionSchema).q1.question,
            q2: (data.answers as QuestionSchema).q2.question,
            q3: (data.answers as QuestionSchema).q3.question
        }
        return { ok: true, data: parsed, userid: data.userId, id: data.id }
    } catch (err) {
        console.log(err)
        return notFound()
    }
}