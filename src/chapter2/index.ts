import { FastifyInstance } from 'fastify'
import { getLogsAsJson } from './mitm'

export function registerChapter2(server: FastifyInstance) {
  server.get('/mitm', async (request, response) => {
    const logsJson = getLogsAsJson()
    response.code(200).send(logsJson)
  })
}
