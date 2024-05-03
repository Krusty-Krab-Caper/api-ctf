import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse } from './util'
import { getSecrets } from './gameSecrets'

type TokenRequest = FastifyRequest<{
    Body: { 
        grant_type: string
    }
    
}>

const correctVaultBearertoken: string = getSecrets().vaultAuthToken
const correctVaultCredentials: string = btoa(`${getSecrets().vaultClientId}:${getSecrets().vaultClientSecret}`)

export const registerToken = (server: FastifyInstance) => {

    server.post('/token',  async (request: TokenRequest, response: FastifyReply) => {
        const { grant_type } = request.body

        console.log(request.headers.authorization)

        if (grant_type !== 'client_credentials'){
            response.code(400).send(ErrorResponse(400, "The required 'grant_type' parameter not included in post body"))
        }

        if (request.headers.authorization !== 'Basic ' + correctVaultCredentials){
            response.code(401).send(ErrorResponse(401, "Not Authorized: Invalid or malformed credentials."))
        } 
    
    
        else {

            response.code(200).send( {
                "access_token": correctVaultBearertoken,
                "expires_in":3599,
                "scope":"",
                "token_type":"bearer"
            } )
        }
    })
}