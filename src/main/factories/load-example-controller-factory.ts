import { LoadExampleController } from '../../presentantion/controllers/example/load-example/load-example-controller'
import { DbLoadExample } from '../../data/usecases/load-examples/db-load-example'
import { ExamplePrismaRepository } from '../../infra/db/prisma/example/example-prisma-repository'

export const makeLoadExamplesController = (): LoadExampleController => {
  const examplePrismaRepository = new ExamplePrismaRepository()
  const dbLoadExample = new DbLoadExample(examplePrismaRepository)
  return new LoadExampleController(dbLoadExample)
}
