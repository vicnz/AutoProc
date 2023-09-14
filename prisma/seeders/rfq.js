const data = [
    {
        id: '26CD802E-DF0C-4C7A-A85E-C03BDB15AED3',
        tracking: [],
        final: false,
        prId: 'B872652C-09C3-434E-93BA-4C11C28F8A19',
        suppliers: [
            { id: "CAADB875-6786-420E-97D1-D94A2DD6CEE6", name: 'JPM General Merchandise & Hardware' },
            { id: "E447CC2A-5C06-4CD0-9BEF-EF152500CA28", name: 'FVA Trading' },
            { id: "F46D2FA9-F8B2-47CE-8C07-21E6A15D2799", name: 'GDP Trading' },
            { id: "047FEA4A-CF7C-43AB-B618-A2D083DB6106", name: 'E.A Amboy General Merchandise' },
        ]
    },
    {
        id: '6BB2AAC7-692A-4202-AB54-938F908640BC',
        tracking: [],
        final: false,
        prId: '26CD802E-DF0C-4C7A-A85E-C03BDB15AED3',
        suppliers: [
            { id: "CAADB875-6786-420E-97D1-D94A2DD6CEE6", name: 'JPM General Merchandise & Hardware' },
            { id: "E447CC2A-5C06-4CD0-9BEF-EF152500CA28", name: 'FVA Trading' },
            { id: "F46D2FA9-F8B2-47CE-8C07-21E6A15D2799", name: 'GDP Trading' },
            { id: "047FEA4A-CF7C-43AB-B618-A2D083DB6106", name: 'E.A Amboy General Merchandise' },
        ]
    },

]

async function main(prisma) {
    return await prisma.price_quotations.createMany({
        data,
        skipDuplicates: true
    })
}

module.exports = main;