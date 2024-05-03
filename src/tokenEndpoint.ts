import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ErrorResponse } from './util'
import { getSecrets } from './gameSecrets'
import { clientCredentials, ClientCredentialPair } from './clientsData'

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

        if (!isValidCredentials(request.headers.authorization)){
            response.code(401).send(ErrorResponse(401, "Not Authorized: Invalid or malformed credentials."))
        } 
        else {

            if (request.headers.authorization !== 'Basic ' + correctVaultCredentials){
                response.code(200).send( {
                    "access_token": crypto.randomUUID(),
                    "expires_in":3599,
                    "scope":"",
                    "token_type":"bearer"
                } )
            }
            else {

                response.code(200).send( {
                    "access_token": correctVaultBearertoken,
                    "expires_in":3599,
                    "scope":"",
                    "token_type":"bearer"
                } )
            }
        }
    })
}

function isValidCredentials(input: string | undefined): boolean{

    if (input === undefined) return false

    let valid: boolean = false

    clientCredentials.forEach((pair:ClientCredentialPair) => {

        console.log('Pair: ' + btoa(pair.clientId + ':' + pair.secret) + ' HEADER: ' + input)

        if (('Basic ' + btoa(pair.clientId + ':' + pair.secret)) == input){
            valid = true
        }
    })

    return valid
}