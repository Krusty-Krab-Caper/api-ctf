import { directoryDataByEmplid, directoryDataByName } from '../directoryData'
import { requestPrototype } from './requestPrototype'

// Directory endpoint
const directoryNames = Array.from(directoryDataByName.keys())
const directoryEmplids = Array.from(directoryDataByEmplid.keys())
const directoryRequestPrototype = {
  ...requestPrototype,
  http_request: {
    ...requestPrototype.http_request,
    path: '/directory',
    method: 'GET',
    query: ''
  }
}

const directoryRequestsByName = [
  {
    ...directoryRequestPrototype,
    http_request: {
      ...directoryRequestPrototype.http_request,
      query: 'name=' + directoryNames[0].replace(/ /g, '%20')
    }
  },
  {
    ...directoryRequestPrototype,
    http_request: {
      ...directoryRequestPrototype.http_request,
      query: ''
    }
  },
  {
    ...directoryRequestPrototype,
    http_request: {
      ...directoryRequestPrototype.http_request,
      query: 'name=' + directoryNames[1].replace(/ /g, '%20')
    }
  }
]

const directoryRequestsByEmplid = [
  {
    ...directoryRequestPrototype,
    http_request: {
      ...directoryRequestPrototype.http_request,
      query: 'emplid=' + directoryEmplids[0]
    }
  },
  {
    ...directoryRequestPrototype,
    http_request: {
      ...directoryRequestPrototype.http_request,
      query: ''
    }
  },
  {
    ...directoryRequestPrototype,
    http_request: {
      ...directoryRequestPrototype.http_request,
      query: 'emplid=' + directoryEmplids[1]
    }
  }
]

export const directoryRequests = [...directoryRequestsByName, ...directoryRequestsByEmplid].sort(
  () => Math.random() - 0.5
)
