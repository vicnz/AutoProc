const data = [
    {
        id: '26CD802E-DF0C-4C7A-A85E-C03BDB15AED3',
        pr_no: null,
        sai: null,
        obr: null,
        reference: null,
        tracking: [],
        final: false,
        enduserId: 'd8abe61b-bef8-4d95-a75a-81c70f1a7aa5',
        particulars: [{ item: "Refrigerator", qty: 1, unit: "pc", price: 3467.78, stockNo: null }]
    },
    {
        id: 'B872652C-09C3-434E-93BA-4C11C28F8A19',
        pr_no: "2023-05-7897F",
        sai: null,
        obr: null,
        reference: null,
        tracking: [],
        final: false,
        enduserId: 'd8abe61b-bef8-4d95-a75a-81c70f1a7aa5',
        particulars: [{ item: "Washine Machine", qty: 1, unit: "pc", price: 3467.78, stockNo: null }]
    },
]

async function main(prisma) {
    await prisma.departments.createMany({
        data: [],
        skipDuplicates: true
    })
}

module.exports = main;