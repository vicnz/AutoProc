async function main(prisma) {
    await prisma.units.createMany({
        data: [
            { id: 'bx', name: 'Box' },
            { id: 'ch', name: 'Container' },
            { id: 'cn', name: 'Can' },
            { id: 'cq', name: 'Cartrige' },
            { id: 'cs', name: 'Case' },
            { id: 'ct', name: 'Carton' },
            { id: 'cy', name: 'Cubic Yard' },
            { id: 'ea', name: 'Each' },
            { id: 'ft', name: 'Foot' },
            { id: 'hr', name: 'Hour' },
            { id: 'in', name: 'Inch' },
            { id: 'lf', name: 'Linear Foot' },
            { id: 'ln', name: 'Length' },
            { id: 'pc', name: 'Piece' },
            { id: 'pk', name: 'Pack' },
            { id: 'qt', name: 'Quart' },
            { id: 'sh', name: 'Sheet' },
            { id: 'tb', name: 'Tube' },
            { id: 'un', name: 'Unit' },
        ],
        skipDuplicates: true
    })
}

module.exports = main;