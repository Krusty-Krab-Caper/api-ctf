import { FastifyInstance } from 'fastify'
import { getLogsAsJson } from './generateLogs'

export function registerMitm(server: FastifyInstance) {
  server.get('/mitm', async (request, response) => {
    const logsJson = getLogsAsJson()
    response.code(200).send(logsJson)
  })
}
