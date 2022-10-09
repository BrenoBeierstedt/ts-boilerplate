import express from 'express'
import middleware from './middleware'
import routes from './routes'

const app = express()
middleware(app)
routes(app)

export default app
