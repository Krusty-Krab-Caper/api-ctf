import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse } from './util'
import { sha1 } from './util'

type GameSecretQuery = {
    id: string
}

type GameSecretRequest = FastifyRequest<{
    Querystring: GameSecretQuery
}>

type GameSecrets = {
    adminEmplid: string
    adminBearerToken: string
    vaultClientId: string
    vaultClientSecret: string
    vaultAuthToken: string

}

let secrets: GameSecrets = {

    adminEmplid: crypto.randomUUID(),
    adminBearerToken: crypto.randomUUID(),
    vaultClientId: sha1(crypto.randomUUID()),
    vaultClientSecret: sha1(crypto.randomUUID()),
    vaultAuthToken: crypto.randomUUID()
}

export const getSecrets = (): GameSecrets => {
    return secrets
}

export const registerSecrets = (server: FastifyInstance) => {

    server.get('/secrets',  async (request: GameSecretRequest, response: FastifyReply) => {
        const { id } = request.query
        
        if (id === undefined) response.code(400).send(ErrorResponse(400, "Bad Request"))

        response.code(200).send(secrets)
    })
}