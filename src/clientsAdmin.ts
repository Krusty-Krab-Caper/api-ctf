import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse } from './util'
import { getSecrets } from './gameSecrets'
import { clientRegistryData, ClientRegistryEntry, clientIds } from './clientsData'

type ClientRegisteryQuery = {
    id?: string
    emplid?: string
}

type ClientRegisteryRequest = FastifyRequest<{
    Querystring: ClientRegisteryQuery
}>

const correctBearertoken: string = getSecrets().adminBearerToken
const correctAdminEmplid: string = getSecrets().adminEmplid

export const registerClients = (server: FastifyInstance) => {

    server.get('/clients',  async (request: ClientRegisteryRequest, response: FastifyReply) => {
        const { id, emplid } = request.query

        if (request.headers.authorization !== 'Bearer ' + correctBearertoken){
            response.code(401).send(ErrorResponse(401, "Not Authorized (Hint: Someone in the organization has an active session!)"))
        } 
    
        if (id === undefined && emplid === undefined){
            response.code(400).send(ErrorResponse(400, "Bad Request"))
        }
    
        else if (id !== undefined){

            const clientEntry: ClientRegistryEntry | undefined = clientRegistryData.get(id)
    
            if (clientEntry === undefined){
                response.code(404).send(ErrorResponse(404, "Client Not Found"))
            }
            else {

                response.code(200).send( clientEntry )
            }
        }

        else if (emplid === correctAdminEmplid){

            response.code(200).send({ clients: clientIds })
        }
    })
}