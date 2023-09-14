const data = [
    {
        id: 'D1A96030-8B5D-4AB6-97CF-DDF6549D5076',
        lowest_bidder: 'F46D2FA9-F8B2-47CE-8C07-21E6A15D2799',
        lowest_cost: 3435.45,
        tracking: [],
        final: false,
        prId: '26CD802E-DF0C-4C7A-A85E-C03BDB15AED3',
        abstractId: '26CD802E-DF0C-4C7A-A85E-C03BDB15AED3'
    },
    {
        id: '2811CA8A-61E6-4EE5-AC4D-F420CF9A9EAE',
        lowest_bidder: '047FEA4A-CF7C-43AB-B618-A2D083DB6106',
        lowest_cost: 342.45,
        tracking: [],
        final: false,
        prId: '26CD802E-DF0C-4C7A-A85E-C03BDB15AED3',
        abstractId: '26CD802E-DF0C-4C7A-A85E-C03BDB15AED3'
    },
]

async function main(prisma) {
    return await prisma.awards.createMany({
        data,
        skipDuplicates: true
    })
}

module.exports = main;