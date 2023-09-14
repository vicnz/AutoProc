const data = [
    {
        id: 'B1C14575-846B-4B35-BAFC-72241FF6B0B6',
        name: 'Northern Star General Merchandise',
        representative: null,
        address: 'Basco, Batanes',
        tin: '6455-45454-454',
    },
    {
        id: 'B5F5AC96-8EE6-49C6-A9D4-8B62BF11A598',
        name: 'Apostol General Merchandise',
        representative: null,
        address: 'Basco, Batanes',
        tin: '6456-45454-454',
    },
    {
        id: '593C7334-CC4C-4BEF-861E-E41AE89B6C08',
        name: 'FMG Trading & Construction Supply',
        representative: null,
        address: 'Basco, Batanes',
        tin: '6454-45454-454',
    },
    {
        id: '6F84BC41-CEB7-48FD-9549-27E2ECD898B8',
        name: 'Hardhat Songbird Industrial Trades',
        representative: null,
        address: 'Tugeuegarao City, Cagayan',
        tin: '7454-45454-454',
    },
    {
        id: 'F62EC1F2-10D6-4AB2-8366-53C5E1955A47',
        name: 'Isabela Livelihood Center & General Merchandise',
        representative: null,
        address: 'Santiago City, Isabela',
        tin: '7854-45454-454',
    },
    {
        id: 'F46D2FA9-F8B2-47CE-8C07-21E6A15D2799',
        name: 'GDP Trading',
        representative: null,
        address: 'Basco, Batanes',
        tin: '7854-45454-457',
    },
    {
        id: 'E447CC2A-5C06-4CD0-9BEF-EF152500CA28',
        name: 'FVA Trading',
        representative: null,
        address: 'Basco, Batanes',
        tin: '7854-45454-459',
    },
    {
        id: '047FEA4A-CF7C-43AB-B618-A2D083DB6106',
        name: 'E.A Amboy General Merchandise',
        representative: null,
        address: 'Basco, Batanes',
        tin: '7854-45454-659',
    },
    {
        id: 'CAADB875-6786-420E-97D1-D94A2DD6CEE6',
        name: 'JPM General Merchandise & Hardware',
        representative: null,
        address: 'Basco, Batanes',
        tin: '7854-45454-690',
    },
]

async function main(prisma) {
    await prisma.suppliers.createMany({
        data: data,
        skipDuplicates: true
    })
}

module.exports = main;