const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//seeders
const department = require('./department')
const sections = require('./sections')
const users = require('./users')
const pr = require('./pr')
const recommendation = require('./recommending')
const suppliers = require('./suppliers')
const rfq = require('./rfq')
const abstract = require('./abstract')
const awarding = require('./awarding')
//
async function seeder() {
    return Promise.all([
        await department(prisma),
        await sections(prisma),
        await suppliers(prisma),
        await users(prisma),
        // await pr(prisma),
        // await recommendation(prisma),
        // await rfq(prisma),
        // await abstract(prisma),
        // await awarding(prisma)
    ])
}
//run seeder
seeder()
    .then(
        async () => {
            await prisma.$disconnect()
        }
    )
    .catch(
        async (e) => {
            console.log(e)
            await prisma.$disconnect()
            process.exit(1)
        }
    )