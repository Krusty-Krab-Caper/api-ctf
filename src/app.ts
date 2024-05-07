import fastifyFormbody from '@fastify/formbody'
import { registerDirectory } from './directory'
import { registerClients } from './clientsAdmin'
import { registerSecrets } from './gameSecrets'
import { ErrorResponse } from './util'
import { registerMitm } from './mitm'
import { registerVault } from './vault'
import { registerToken } from './tokenEndpoint'
import { FastifyInstance } from 'fastify'

export function build(server: FastifyInstance): FastifyInstance {
  server.register(fastifyFormbody)

  registerDirectory(server)
  registerClients(server)
  registerMitm(server)
  registerVault(server)
  registerToken(server)
  registerSecrets(server)

  server.setNotFoundHandler(async function (request, reply) {
    await reply.code(404).send(ErrorResponse(404, 'Path not found'))
  })

  server.setErrorHandler(async function (error, request, reply) {
    if (error.statusCode === 400) {
      server.log.warn({ err: error }, 'Invalid request error')
      await reply.code(400).send(ErrorResponse(400, error.message))
    } else if (error.statusCode === 404) {
      await reply.code(404).send(ErrorResponse(404, error.message))
    } else {
      server.log.error({ err: error }, 'Internal Server error')
      await reply.code(error.statusCode ?? 500).send(ErrorResponse(500, error.message))
    }
  })

  return server
}
