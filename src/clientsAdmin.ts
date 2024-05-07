import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse } from './util'
import { getSecrets } from './gameSecrets'
import { clientRegistryData, ClientRegistryEntry, clientIds, employeeClientAccessData, EmployeeAccessRecord} from './clientsData'

type ClientListQuery = {
    emplid: string
}

type ClientListRequest = FastifyRequest<{
    Querystring: ClientListQuery
}>

type ClientDetailsQuery = {
    clientId: string
}

type ClientDetailsRequest = FastifyRequest<{
    Querystring: ClientDetailsQuery
}>

const correctBearertoken: string = getSecrets().adminBearerToken
const correctAdminEmplid: string = getSecrets().adminEmplid

export const registerClientsList = (server: FastifyInstance) => {

    server.get('/clients/list',  async (request: ClientListRequest, response: FastifyReply) => {
        const { emplid } = request.query

        if (request.headers.authorization !== 'Bearer ' + correctBearertoken){
            response.code(401).send(ErrorResponse(401, "Not Authorized (Hint: Someone in the organization has an active session!)"))
        }

        if (emplid === undefined){
            response.code(400).send(ErrorResponse(400, "Bad Request"))
        }

        const accessRecord = getEmployeeAccess(emplid??'')

        if (accessRecord === undefined){
            response.code(404).send(ErrorResponse(404, "Not Found: Employee has no owned clients"))
        } 

        else if (accessRecord !== undefined){

            const ownedClients = accessRecord.clientIds
    
            response.code(200).send({ clients: ownedClients })

        }
    })
}
export const registerClientsDetails = (server: FastifyInstance) => {

    server.get('/clients/details',  async (request: ClientDetailsRequest, response: FastifyReply) => {
        const { clientId } = request.query

        if (request.headers.authorization !== 'Bearer ' + correctBearertoken){
            response.code(401).send(ErrorResponse(401, "Not Authorized (Hint: Someone in the organization has an active session!)"))
        }

        if (clientId === undefined){
            response.code(400).send(ErrorResponse(400, "Bad Request"))
        }
    
        else {

            const clientEntry: ClientRegistryEntry | undefined = clientRegistryData.get(clientId)
    
            if (clientEntry === undefined){
                response.code(404).send(ErrorResponse(404, "Client Not Found"))
            }
            else {

                response.code(200).send( clientEntry )
            }
        }
    })
}

function getEmployeeAccess (emplid: string): EmployeeAccessRecord | undefined {

    return employeeClientAccessData.get(emplid)
}