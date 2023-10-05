async function main(prisma) {
    await prisma.departments.createMany({
        data: [
            { id: 'bc1f2cc3-4b44-456a-b26e-15a7bdb220a9', name: 'BAC', description: 'Bids & Awards Committee' },
            { id: 'e8bd4b43-b285-4a89-85ff-00e67fc07516', name: 'OOP', description: 'Office of the College President' },
            { id: 'bb30c12a-b856-4946-85c0-b64cd41fe943', name: 'DI-SEC', description: 'Director of Instruction' },
            { id: 'a690411f-5f75-4613-ab0e-da061e2da8b0', name: 'BOARD-SEC', description: 'Board Secretariat' },
            { id: '587dd518-d69b-4811-a8d4-d8427b3c875d', name: 'SUPPLY', description: 'BSC Supply Section' },
            { id: 'e873ba86-9ad4-4354-83a6-e1dbf5b4aa83', name: 'ACCNT', description: 'Accounting Department' },
            { id: 'd8f227ed-c169-4b22-a508-481d703128f4', name: 'BUDGT', description: 'Budgetary Department' },
            { id: 'c92cd135-391a-45a9-a396-1219a71bd174', name: 'HR', description: 'Human Resource Management' },
            { id: 'e0d6241d-e813-4662-bbd4-fc89a282221d', name: 'IT-SEC', description: 'Information Technology Management' },
            { id: '16af5f3f-58f1-4f11-93a5-238698ae54ef', name: 'TECH-AD', description: 'Server Administration' },
            { id: '8ecb0601-2883-463f-90da-62d69d4c851a', name: 'ADMIN', description: 'Administrator' },
        ],
        skipDuplicates: true
    })
}

module.exports = main;