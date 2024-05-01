
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { directoryData, DirectoryEntry } from './data'
import { ErrorResponse, sha1 } from './util';

const server = fastify();

type DirectoryEmployeeQuery = {
    id: string
}

type DirectoryEmployeeRequest = FastifyRequest<{
    Querystring: DirectoryEmployeeQuery
}>

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

server.get('/directory',  async (request: DirectoryEmployeeRequest, response: FastifyReply) => {
    const { id } = request.query

    let directoryEntry: DirectoryEntry | undefined = directoryData.get(id) 

    if (directoryEntry === undefined) {
        response.code(404).send(ErrorResponse(404, "Not Found"))
    }
    else {

        response.send(directoryEntry)

    }

    console.log(sha1(id))
})

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

