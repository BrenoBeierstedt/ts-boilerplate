import { LoadExampleRepository } from '../../protocols/db/example/load-example-repository'
import { ExampleModel } from '../../../domain/models/example'
import { DbLoadExample } from './db-load-example'

const makeFakeExample = (): ExampleModel[] => {
  return [{
    id: 1,
    title: 'some title'
  },
  {
    id: 2,
    title: 'other title'
  }
  ]
}

interface SutTypes {
  sut: DbLoadExample
  loadExamplesRepositorystub: LoadExampleRepository
}

const makeLoadExamplesRepository = (): LoadExampleRepository => {
  class LoadExamplesRepositoryStub implements LoadExampleRepository {
    async loadAll (): Promise<ExampleModel[]> {
      return new Promise<ExampleModel[]>((resolve) => resolve(makeFakeExample()))
    }
  }
  return new LoadExamplesRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadExamplesRepositorystub = makeLoadExamplesRepository()
  const sut = new DbLoadExample(loadExamplesRepositorystub)
  return { sut, loadExamplesRepositorystub }
}

describe('DbLoadExample', () => {
  test('Should call LoadExampleRepository', async () => {
    const { sut, loadExamplesRepositorystub } = makeSut()
    const loadAllSpy = jest.spyOn(loadExamplesRepositorystub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Example on success', async () => {
    const { sut } = makeSut()
    const example = await sut.load()
    expect(example).toEqual(makeFakeExample())
  })

  test('Should throw if LoadExamplesRepository throws', async () => {
    const { sut, loadExamplesRepositorystub } = makeSut()
    jest.spyOn(loadExamplesRepositorystub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
