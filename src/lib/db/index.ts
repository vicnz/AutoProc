import { PrismaClient, Prisma } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()
export default prisma

if ((process?.env?.NODE_ENV) as string !== '') globalForPrisma.prisma = prisma

//types
type ModelNames = Prisma.ModelName

export type PrismaModels = {
    [M in ModelNames]: Exclude<
        Awaited<ReturnType<PrismaClient[Uncapitalize<M>]["findUnique"]>>,
        null
    >;
}

export let PrismaClientError = Prisma.PrismaClientKnownRequestError

//usage type userId = PrismaModels["Users"]?[fieldname]
