import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import Path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  readdirSync(Path.join(__dirname, '/../routes')).map(async file => {
    if (!file.includes(('.spec.'))) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
