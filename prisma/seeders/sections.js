async function main(prisma) {
    await prisma.sections.createMany({
        data: [
            { name: 'PROC', description: 'Procurement Management', departmentId: 'bc1f2cc3-4b44-456a-b26e-15a7bdb220a9' },
            { name: 'PROC-UTIL', description: 'Procurement Utility Management', departmentId: 'bc1f2cc3-4b44-456a-b26e-15a7bdb220a9' }
        ],
        skipDuplicates: true
    })
}

module.exports = main;