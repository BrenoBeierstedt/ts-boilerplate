import { example } from './example'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    for (const job of example) {
        await prisma.example.create({
            data: {
                title: job.title,
            }
        })
    }
}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async () => prisma.$disconnect())