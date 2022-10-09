import { LoadExampleController } from './load-example-controller'
import { LoadExample, ExampleModel } from './load-example-controller-protocols'
import MockDate from 'mockdate'
import { noContent, ok, serverError } from '../../../helpers/http-helper'

const makeFakeExamples = (): ExampleModel[] => {
  return [{
    id: 1,
    title: 'some title',
  },
  {
    id: 2,
    title: 'other title',
  }
  ]
}

interface SutTypes {
  sut: LoadExampleController
  loadExamplesStub: LoadExample
}

const makeLoadExamples = (): LoadExample => {
  class LoadExamplesStub implements LoadExample {
    async load (): Promise<ExampleModel[]> {
      return new Promise(resolve => resolve(makeFakeExamples()))
    }
  }
  return new LoadExamplesStub()
}

const makeSut = (): SutTypes => {
  const loadExamplesStub = makeLoadExamples()
  const sut = new LoadExampleController(loadExamplesStub)
  return { sut, loadExamplesStub }
}

describe('LoadExample Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadExample', async () => {
    const { sut, loadExamplesStub } = makeSut()
    const loadSpy = jest.spyOn(loadExamplesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeExamples()))
  })

  test('Should return 204 if LoadExample return empty', async () => {
    const { sut, loadExamplesStub } = makeSut()
    jest.spyOn(loadExamplesStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => resolve([])))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadExample throws', async () => {
    const { sut, loadExamplesStub } = makeSut()
    jest.spyOn(loadExamplesStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError())
  })
})
