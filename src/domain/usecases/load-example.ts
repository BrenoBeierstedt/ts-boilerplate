import { ExampleModel } from '../models/example'
export interface LoadExample {
  load: () => Promise<ExampleModel[]>
}
