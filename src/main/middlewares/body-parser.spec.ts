import request from 'supertest'
import app from '../config/app'

describe('Bosy Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/example', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/example')
      .send({ title: 'Any_title' })
      .expect({ title: 'Any_title' })
  })
})
