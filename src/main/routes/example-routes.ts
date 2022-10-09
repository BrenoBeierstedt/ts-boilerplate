import { Router } from 'express'
import { makeLoadExamplesController } from '../factories/load-example-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
export default (router: Router): void => {
  router.get('/example', adaptRoute(makeLoadExamplesController()))
}
