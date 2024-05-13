import { randomToken } from '../util'
import { requestPrototype } from './requestPrototype'

// Vault endpoint
const vaultRequestPrototype = {
  ...requestPrototype,
  channel: 'back',
  http_request: {
    ...requestPrototype.http_request,
    headers: {
      ...requestPrototype.http_request.headers,
      'user-agent': 'Apache-HttpClient/4.5.14 (Java/11.0.21)',
      authorization: 'Bearer ' + randomToken()
    },
    path: '/vault',
    method: 'GET',
    query: ''
  },
  http_response: {
    ...requestPrototype.http_response,
    status: 401,
    text_status: 'Unauthorized'
  }
}
export const vaultRequests = [vaultRequestPrototype]
