import fastify from 'fastify'

import { registerDirectory } from './directory'
import { registerClients } from './clientsAdmin'
import { registerSecrets } from './gameSecrets'
import { ErrorResponse } from './util'
import { getSecrets } from './gameSecrets'
import { registerChapter2 } from './chapter2'
import { registerVault } from './vault'

const server = fastify()

console.log(getSecrets())

registerDirectory(server)
registerClients(server)
registerChapter2(server)
registerVault(server)

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

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
