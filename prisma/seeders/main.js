const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//seeders
const department = require('./department')
const sections = require('./sections')
const users = require('./users')
const suppliers = require('./suppliers')
//
async function seeder() {
    return Promise.all([
        await department(prisma),
        await sections(prisma),
        await suppliers(prisma),
        await users(prisma),
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