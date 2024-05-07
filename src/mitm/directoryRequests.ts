import { directoryData } from '../directoryData'
import { requestPrototype } from './requestPrototype'

// Directory endpoint
const directoryIds = Array.from(directoryData.keys())
const directoryRequestPrototype = {
  ...requestPrototype,
  http_request: {
    ...requestPrototype.http_request,
    path: '/directory',
    method: 'GET',
    query: ''
  }
}
export const directoryRequests = [
  {
    ...directoryRequestPrototype,
    http_request: {
      ...directoryRequestPrototype.http_request,
      query: 'id=' + directoryIds[0]
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
      query: 'id=' + directoryIds[1]
    }
  }
].sort(() => Math.random() - 0.5)
