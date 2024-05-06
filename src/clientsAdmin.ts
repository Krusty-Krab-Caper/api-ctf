import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse } from './util'
import { getSecrets } from './gameSecrets'
import { clientRegistryData, ClientRegistryEntry, clientIds } from './clientsData'

type ClientRegisteryQuery = {
    id: string
}

type ClientRegisteryRequest = FastifyRequest<{
    Querystring: ClientRegisteryQuery
}>

const correctBearertoken: string = getSecrets().adminBearerToken

export const registerClients = (server: FastifyInstance) => {

    server.get('/clients',  async (request: ClientRegisteryRequest, response: FastifyReply) => {
        const { id } = request.query

        if (request.headers.authorization !== 'Bearer ' + correctBearertoken){
            response.code(401).send(ErrorResponse(401, "Not Authorized (Hint: Someone in the organization has an active session!)"))
        } 
    
        if (id === undefined){
            response.code(200).send({ clientIds: clientIds })
        }
    
        else {

            const clientEntry: ClientRegistryEntry | undefined = clientRegistryData.get(id)
    
            if (clientEntry === undefined){
                response.code(404).send(ErrorResponse(404, "Client Not Found"))
            }
            else {

                response.code(200).send( clientEntry )
            }
        }
    })
}