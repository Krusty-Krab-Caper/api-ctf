export type RequestLog = {
  http_request: {
    headers: {
      accept: string
      'user-agent': string
      authorization?: string
    }
    host: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    path: string
    query?: string
    body?: {}
    remote: string
    scheme: string
  }
  http_response: {
    headers: {
      'cache-control': string
      'content-type': string
    }
    size: number
    status: number
    text_status: string
    took: number
  }
  level: string
  msg: string
  time: string
}

export type PartialRequestLog = {
  http_request?: {
    headers?: {
      accept?: string
      'user-agent'?: string
      authorization?: string
    }
    host?: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    path?: string
    query?: string
    body?: {}
    remote?: string
    scheme?: string
  }
  http_response?: {
    headers?: {
      'cache-control'?: string
      'content-type'?: string
    }
    size?: number
    status?: number
    text_status?: string
    took?: number
  }
  level?: string
  msg?: string
  time?: string
}

export const requestPrototype: RequestLog = {
  http_request: {
    headers: {
      accept: 'application/json',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    host: 'localhost:8080',
    method: 'GET',
    path: '/',
    remote: '127.0.0.1:51952',
    scheme: 'http'
  },
  http_response: {
    headers: {
      'cache-control': 'private, no-cache, no-store, must-revalidate',
      'content-type': 'application/json; charset=utf-8'
    },
    size: 2116,
    status: 200,
    text_status: 'OK',
    took: 14843
  },
  level: 'info',
  msg: 'completed handling request',
  time: new Date().toISOString()
}

export function generateRequest(
  options: PartialRequestLog,
  defaultOptions: RequestLog = requestPrototype
) {
  // combine the default options with the provided options
  return {
    ...defaultOptions,
    ...options,
    http_request: {
      ...defaultOptions.http_request,
      ...options.http_request,
      headers: {
        ...defaultOptions.http_request.headers,
        ...options.http_request?.headers
      }
    },
    http_response: {
      ...defaultOptions.http_response,
      ...options.http_response,
      headers: {
        ...defaultOptions.http_response.headers,
        ...options.http_response?.headers
      }
    }
  }
}
