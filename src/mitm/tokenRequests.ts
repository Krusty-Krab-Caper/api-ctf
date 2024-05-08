import { randomToken } from '../util'
import { clientCredentials } from '../clientsData'
import { RequestLog, generateRequest, requestPrototype } from './requestPrototype'

// Token endpoint
const tokenRequestDefault: RequestLog = generateRequest({
  http_request: {
    path: '/token',
    method: 'POST',
    query: '',
    body: {
      grant_type: 'client_credentials'
    }
  }
})

const realIdSecretPair = Buffer.from(
  clientCredentials[0].clientId + ':' + clientCredentials[0].secret
).toString('base64')

const clientIdLength = clientCredentials[0].clientId.length
const clientSecretLength = clientCredentials[0].secret.length
const fakeIdSecretPair = Buffer.from(
  randomToken().substring(0, clientIdLength) + ':' + randomToken().substring(0, clientSecretLength)
).toString('base64')

const partialTokenRequests = [
  {
    http_request: {
      headers: {
        authorization: 'Basic ' + realIdSecretPair
      }
    }
  },
  {
    http_request: {
      headers: {
        authorization: 'Basic ' + fakeIdSecretPair
      }
    },
    http_response: {
      status: 401,
      text_status: 'Unauthorized'
    }
  }
]

export const tokenRequests = partialTokenRequests
  .map((partial) => generateRequest(partial, tokenRequestDefault))
  .sort(() => Math.random() - 0.5)
