import request from 'supertest'
import app from '../config/app'

describe('GET /example', () => {
  test('Should return 200 on success', async () => {
    await request(app)
      .get('/api/example')
      .expect(200)
  })
})
