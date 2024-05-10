import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse, randomToken } from './util'

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
  vaultMasterPassword: string
}

const secrets: GameSecrets = {
  adminEmplid: crypto.randomUUID(),
  adminBearerToken: randomToken(),
  vaultClientId: '3f3af70ac4f5e17606975a442c6eec24e3c28be9',
  vaultClientSecret: 'a1c5012745bd810a15e98b6bff32a9559d5dab17',
  vaultAuthToken: randomToken(),
  vaultMasterPassword: 'literally_best_password_ever'
}

export const getSecrets = (): GameSecrets => {
  return secrets
}

export const registerSecrets = (server: FastifyInstance) => {
  server.get('/secrets', async (request: GameSecretRequest, response: FastifyReply) => {
    const { id } = request.query

    if (id === undefined) response.code(400).send(ErrorResponse(400, 'Bad Request'))

    response.code(200).send(secrets)
  })
}
