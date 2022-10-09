export class ServerError extends Error {
  constructor () {
    super('Invalid server Error')
    this.name = 'ServerError'
  }
}
