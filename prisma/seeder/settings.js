
async function main(prisma) {
    await prisma.settings.createMany({
        data: [
            { name: 'notice', description: "Number Of Days Before Trigger A Delivery Notice", value: 3 },
            { name: 'theme', description: "Global Settings For Theme State", value: 'default' },
            { name: 'prgen', description: "Reset Date, where the PR Number Generator depends, this settings is only SET ONCE", value: '2000-01-01' }, //Extract Only the Month and Date, By Default it's Januay 1
        ]
    })
}

module.exports = main;