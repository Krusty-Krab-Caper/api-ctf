import { randomToken, chooseRandom } from '../util'
import { clientIds, employeeClientAccessData } from '../clientsData'
import { requestPrototype } from './requestPrototype'
import { getSecrets } from '../gameSecrets'

const secrets = getSecrets()

const redHerringEmplids = Array.from(employeeClientAccessData.keys()).filter(
  (emplid) => emplid !== secrets.adminEmplid
)

const targetClientRequest = {
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
    path: '/clients/details',
    method: 'GET',
    query: 'clientId=' + clientIds[0]
  },
  http_response: {
    ...requestPrototype.http_response,
    status: 401,
    text_status: 'Unauthorized'
  }
}

const redHerringBadRequest = { ...clientsRequestPrototype }

const redHerringEmplidRequests = redHerringEmplids.map((token) => ({
  ...requestPrototype,
  http_request: {
    ...requestPrototype.http_request,
    headers: {
      ...requestPrototype.http_request.headers,
      authorization: 'Bearer ' + secrets.adminBearerToken
    },
    method: 'GET',
    path: '/clients/list',
    query: 'emplid=' + employeeClientAccessData.get(token)?.emplid
  },
  http_response: {
    ...requestPrototype.http_response,
    status: 200,
    text_status: 'OK'
  }
}))

const redHerringClientIdRequests = redHerringEmplids.map((emplid) => ({
  ...requestPrototype,
  http_request: {
    ...requestPrototype.http_request,
    headers: {
      ...requestPrototype.http_request.headers,
      authorization: 'Bearer ' + secrets.adminBearerToken
    },
    method: 'GET',
    path: '/clients/details',
    query: 'clientId=' + chooseRandom(employeeClientAccessData.get(emplid)?.clientIds ?? [])
  },
  http_response: {
    ...requestPrototype.http_response,
    status: 200,
    text_status: 'OK'
  }
}))

export const clientsRequests = [
  // targetClientRequest,
  redHerringBadRequest,
  ...redHerringEmplidRequests,
  ...redHerringClientIdRequests
].sort(() => Math.random() - 0.5)
