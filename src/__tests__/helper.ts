import fastify from 'fastify'
import { build } from '../app'

export function buildServer() {
  const app = fastify()

  beforeAll(async () => {
    build(app)
    await app.ready()
  })

  afterAll(() => {
    app.close()
  })

  return app
}
