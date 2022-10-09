import { jobs } from './jobs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    for (const job of jobs) {
        await prisma.job.create({
            data: {
                title: job.title,
                description: job.description,
                companyName: job.companyName,
                cityName: job.cityName,
                stateName: job.stateName,
                updatedAt: new Date(job.updatedAt),
                createdAt: new Date(job.createdAt)
            }
        })
    }
}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(async () => prisma.$disconnect())