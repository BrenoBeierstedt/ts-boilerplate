import { prisma } from '../../../../main/config/prisma'
import { LoadExampleRepository } from '../../../../data/protocols/db/example/load-example-repository'
import { ExampleModel } from '../../../../domain/models/example'

export class ExamplePrismaRepository implements LoadExampleRepository {
  async loadAll (): Promise<ExampleModel[]> {
    return await prisma.example.findMany({})
  }
}
