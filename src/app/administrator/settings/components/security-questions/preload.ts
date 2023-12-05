import db from '@lib/db'

export const preload = async (userid: string) => {
    const answers = await db.security_answers.findFirst({
        select: {
            answers: true,
            id: true,
            userId: true
        },
        where: {
            userId: userid
        }
    })

    if (!answers) {
        throw new Error("No Security Question")
    }

    return answers;
}

export const secQuestions = async () => {
    const questions = await db.security_questions.findMany({
        select: {
            name: true,
            description: true
        },
    })

    return questions;
}