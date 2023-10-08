const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//seeders
const department = require('./department')
const sections = require('./sections')
const users = require('./users')
const suppliers = require('./suppliers')
const units = require('./units')
const officers = require('./officers')
//
async function seeder() {
    return Promise.all([
        await units(prisma),
        await department(prisma),
        await sections(prisma),
        await suppliers(prisma),
        await users(prisma),
        await officers(prisma)
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