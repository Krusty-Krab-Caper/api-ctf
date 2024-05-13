import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse, randomToken, chooseRandom } from './util'

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
  vaultMasterPassword: generateRandomMasterPassword()
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

function generateRandomMasterPassword(): string {
  const choices = [
    'jellyfish',
    'pineapple',
    'squidward',
    'starfish',
    'sandy',
    'bubble',
    'treasure',
    'seashell',
    'coral',
    'mermaid',
    'barnacle',
    'anchovy',
    'spatula',
    'seaweed',
    'clam',
    'pearl'
  ]

  const length = 4
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chooseRandom(choices) + '-'
  }

  return password.slice(0, -1)
}
