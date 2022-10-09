import { Controller, HttpRequest, HttpResponse, LoadExample } from './load-example-controller-protocols'
import { noContent, ok, serverError } from '../../../helpers/http-helper'

export class LoadExampleController implements Controller {
  constructor (private readonly loadExamples: LoadExample) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const examples = await this.loadExamples.load()
      return examples.length ? ok(examples) : noContent()
    } catch (err) {
      return serverError()
    }
  }
}
