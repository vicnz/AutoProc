async function main(prisma) {
    await prisma.sections.createMany({
        data: [
            { id: '87d74679-8ce4-41f7-a267-3f9e1831a0bc', name: 'PROC', description: 'Procurement Management', departmentId: 'bc1f2cc3-4b44-456a-b26e-15a7bdb220a9' },
            { id: '9c8c9467-7d0c-417d-9b58-bd40d07c560e', name: 'PROC-UTIL', description: 'Procurement Utility Management', departmentId: 'bc1f2cc3-4b44-456a-b26e-15a7bdb220a9' },
            { id: '3edb3c47-0139-40c0-a0a9-2b928b4b2c04', name: 'OPERATION', description: 'Student Services', departmentId: 'c92cd135-391a-45a9-a396-1219a71bd174' }
        ],
        skipDuplicates: true
    })
}

module.exports = main;