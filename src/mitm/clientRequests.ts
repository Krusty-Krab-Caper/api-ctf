import { randomToken, chooseRandom } from '../util'
import { clientIds, employeeClientAccessData } from '../clientsData'
import { requestPrototype } from './requestPrototype'
import { getSecrets } from '../gameSecrets'

const secrets = getSecrets()

const redHerringTokens = Array.from(employeeClientAccessData.keys()).filter(
  (token) => token !== secrets.adminBearerToken
)

export const targetClientRequest = {
  ...requestPrototype,
  http_request: {
    ...requestPrototype.http_request,
    headers: {
      ...requestPrototype.http_request.headers,
      authorization: 'Bearer ' + secrets.adminBearerToken
    },
    method: 'GET',
    path: '/clients',
    query: 'emplid=' + secrets.adminEmplid
  },
  http_response: {
    ...requestPrototype.http_response,
    size: 2116,
    status: 200,
    text_status: 'OK',
    took: 14843
  }
}

const clientsRequestPrototype = {
  ...requestPrototype,
  http_request: {
    ...requestPrototype.http_request,
    headers: {
      ...requestPrototype.http_request.headers,
      authorization: 'Bearer ' + randomToken()
    },
    path: '/clients',
    method: 'GET',
    query: 'id=' + clientIds[0]
  },
  http_response: {
    ...requestPrototype.http_response,
    status: 401,
    text_status: 'Unauthorized'
  }
}

const redHerringBadRequest = { ...clientsRequestPrototype }

const redHerringEmplidRequests = redHerringTokens.map((token) => ({
  ...requestPrototype,
  http_request: {
    ...requestPrototype.http_request,
    headers: {
      ...requestPrototype.http_request.headers,
      authorization: `Bearer ${token}`
    },
    method: 'GET',
    path: '/clients',
    query: 'emplid=' + employeeClientAccessData.get(token)?.emplid
  },
  http_response: {
    ...requestPrototype.http_response,
    status: 200,
    text_status: 'OK'
  }
}))

const redHerringClientIdRequests = redHerringTokens.map((token) => ({
  ...requestPrototype,
  http_request: {
    ...requestPrototype.http_request,
    headers: {
      ...requestPrototype.http_request.headers,
      authorization: `Bearer ${token}`
    },
    method: 'GET',
    path: '/clients',
    query: 'id=' + chooseRandom(employeeClientAccessData.get(token)?.clientIds ?? [])
  },
  http_response: {
    ...requestPrototype.http_response,
    status: 200,
    text_status: 'OK'
  }
}))

export const clientsRequests = [
  targetClientRequest,
  redHerringBadRequest,
  ...redHerringEmplidRequests,
  ...redHerringClientIdRequests
].sort(() => Math.random() - 0.5)
