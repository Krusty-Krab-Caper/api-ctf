import { randomToken } from '../util'
import { clientCredentials } from '../clientsData'
import { requestPrototype } from './requestPrototype'

// Token endpoint
const tokenRequestPrototype = {
  ...requestPrototype,
  channel: 'back',
  http_request: {
    ...requestPrototype.http_request,
    path: '/token',
    method: 'POST',
    query: '',
    body: {
      grant_type: 'client_credentials'
    }
  }
}
const clientIdLength = clientCredentials[0].clientId.length
const clientSecretLength = clientCredentials[0].secret.length
export const tokenRequests = [
  {
    ...tokenRequestPrototype,
    http_request: {
      ...tokenRequestPrototype.http_request,
      headers: {
        ...tokenRequestPrototype.http_request.headers,
        authorization:
          'Basic ' +
          Buffer.from(clientCredentials[0].clientId + ':' + clientCredentials[0].secret).toString(
            'base64'
          )
      }
    }
  },
  {
    ...tokenRequestPrototype,
    http_request: {
      ...tokenRequestPrototype.http_request,
      headers: {
        ...tokenRequestPrototype.http_request.headers,
        authorization:
          'Basic ' +
          Buffer.from(
            randomToken().substring(0, clientIdLength) +
              ':' +
              randomToken().substring(0, clientSecretLength)
          ).toString('base64')
      }
    },
    http_response: {
      ...requestPrototype.http_response,
      status: 401,
      text_status: 'Unauthorized'
    }
  }
].sort(() => Math.random() - 0.5)
