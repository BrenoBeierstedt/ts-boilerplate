import { HttpResponse } from '../protocols'
import { ServerError } from '../errors/server-error'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
