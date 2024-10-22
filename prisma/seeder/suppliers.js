const data = [
    {
        id: 'B1C14575-846B-4B35-BAFC-72241FF6B0B6',
        name: 'Northern Star General Merchandise',
        representative: "John Jose Maria",
        address: 'Basco, Batanes',
        tin: '6455-45454-454',
        position: "Manager",
    },
    {
        id: 'B5F5AC96-8EE6-49C6-A9D4-8B62BF11A598',
        name: 'Apostol General Merchandise',
        representative: "Gillermo Apostol",
        address: 'Basco, Batanes',
        tin: '6456-45454-454',
        position: "Marketer"
    },
    {
        id: '593C7334-CC4C-4BEF-861E-E41AE89B6C08',
        name: 'FMG Trading & Construction Supply',
        representative: "Sarah Heronimo",
        address: 'Basco, Batanes',
        tin: '6454-45454-454',
        position: "Co-CEO"
    },
    {
        id: '6F84BC41-CEB7-48FD-9549-27E2ECD898B8',
        name: 'Hardhat Songbird Industrial Trades',
        representative: "Zurc Hontiveros",
        address: 'Tugeuegarao City, Cagayan',
        tin: '7454-45454-454',
        position: 'Manager'
    },
    {
        id: 'F62EC1F2-10D6-4AB2-8366-53C5E1955A47',
        name: 'Isabela Livelihood Center & General Merchandise',
        representative: "Jimmy Fallon",
        address: 'Santiago City, Isabela',
        tin: '7854-45454-454',
        position: 'CEO'
    },
    {
        id: 'F46D2FA9-F8B2-47CE-8C07-21E6A15D2799',
        name: 'GDP Trading',
        representative: "Jake Handall",
        address: 'Basco, Batanes',
        tin: '7854-45454-457',
        position: "Supply Manager"
    },
    {
        id: 'E447CC2A-5C06-4CD0-9BEF-EF152500CA28',
        name: 'FVA Trading',
        representative: "Maria Filoria",
        address: 'Basco, Batanes',
        tin: '7854-45454-459',
        position: 'Manager'
    },
    {
        id: '047FEA4A-CF7C-43AB-B618-A2D083DB6106',
        name: 'E.A Amboy General Merchandise',
        representative: "Emelda Amboy",
        address: 'Basco, Batanes',
        tin: '7854-45454-659',
        position: "Owner"
    },
    {
        id: 'CAADB875-6786-420E-97D1-D94A2DD6CEE6',
        name: 'JPM General Merchandise & Hardware',
        representative: "John Paul Marcos",
        address: 'Basco, Batanes',
        tin: '7854-45454-690',
        position: "CEO"
    },
]

async function main(prisma) {
    await prisma.suppliers.createMany({
        data: data,
        skipDuplicates: true
    })
}

module.exports = main;