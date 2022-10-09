import { ExampleModel } from '../../../../domain/models/example'

export interface LoadExampleRepository {
  loadAll: () => Promise<ExampleModel[]>
}
