const data = [
    {
        id: '26CD802E-DF0C-4C7A-A85E-C03BDB15AED3',
        tracking: [],
        final: false,
        prId: 'B872652C-09C3-434E-93BA-4C11C28F8A19'
    },
    {
        id: '6BB2AAC7-692A-4202-AB54-938F908640BC',
        tracking: [],
        final: false,
        prId: '26CD802E-DF0C-4C7A-A85E-C03BDB15AED3'
    },

]

async function main(prisma) {
    return await prisma.recommendation.createMany({
        data,
        skipDuplicates: true
    })
}

module.exports = main;