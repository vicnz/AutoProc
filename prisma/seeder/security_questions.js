async function main(prisma) {
    await prisma.security_questions.createMany({
        data: [
            { name: "What is the name of your dog?" },
            { name: "What is your favorite color?" },
            { name: "In what city you were born?" },
            { name: "What is your favorite subject?" },
            { name: "Where did you take your high school?" },
            { name: "What is your well-preferred nickname?" },
        ],
        skipDuplicates: true
    })
}

module.exports = main;