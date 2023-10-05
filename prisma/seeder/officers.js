async function main(prisma) {
    await prisma.officers.createMany({
        data: [
            { position: 'HEAD', fname: 'Djovi', mname: 'Regala', lname: 'Durante', title: 'College President' },
            { position: 'CHAIR', fname: 'Doreen', mname: 'Cariaso', lname: 'Castillo', title: 'BAC Chairperson' },
            { position: 'VICE', fname: 'Fortunato Phillip', mname: 'A', lname: 'Cabugao', title: 'BAC Vice Chairperson' },
            { position: 'MEMBER', fname: 'Bryan Dave', mname: 'P', lname: 'Revilla', title: 'BAC Member' },
            { position: 'MEMBER', fname: 'Randall', mname: 'G', lname: 'Castillo', title: 'BAC Member' },
            { position: 'MEMBER', fname: 'Emilyn', mname: 'D', lname: 'Alueta', title: 'BAC Member' },
            { position: 'MEMBER', fname: 'Magdalena', mname: 'V', lname: 'Balles', title: 'BAC Member' },
        ],
        skipDuplicates: true
    })
}

module.exports = main;