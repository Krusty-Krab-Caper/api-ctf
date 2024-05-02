import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse } from './util'

type ClientRegisteryQuery = {
    id: string
}

type ClientRegisteryRequest = FastifyRequest<{
    Querystring: ClientRegisteryQuery
}>

const getCorrectAuthtoken = () => {
    return 'this-is-the-authtoken-for-now'
}

const correctAuthtoken: string = getCorrectAuthtoken()

export const registerClients = (server: FastifyInstance) => {

    server.get('/clients',  async (request: ClientRegisteryRequest, response: FastifyReply) => {
        const { id } = request.query

        console.log(request.headers.authorization)

        if (request.headers.authorization !== correctAuthtoken){
            response.code(401).send(ErrorResponse(401, "Not Authorized"))
        } 
    
        if (id === undefined){
            response.code(400).send(ErrorResponse(400, "Bad Request"))
        }
    
        else {
    
            response.code(200).send( { message: "this is some juicy data" } )
        }
    
    })
}