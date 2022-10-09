import { LoadExample } from '../../../domain/usecases/load-example'
import { ExampleModel } from '../../../domain/models/example'
import { LoadExampleRepository } from '../../protocols/db/example/load-example-repository'

export class DbLoadExample implements LoadExample {
  constructor (private readonly loadExampleRepository: LoadExampleRepository) {}
  async load (): Promise<ExampleModel[]> {
    const example = await this.loadExampleRepository.loadAll()
    return example
  }
}
