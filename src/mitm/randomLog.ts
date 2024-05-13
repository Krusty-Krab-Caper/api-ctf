import { randomToken } from '../util'

const statusTextMap: Record<number, string> = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error'
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const methodStatusMap: Record<HttpMethod, number[]> = {
  GET: [200, 400, 401, 403, 404, 500],
  POST: [201, 400, 401, 403, 404, 500],
  PUT: [200, 400, 401, 403, 404, 500],
  DELETE: [200, 400, 401, 403, 404, 500]
}

type Endpoint = {
  path: string
  methods: HttpMethod[]
  needsAuth?: boolean
}

const hostEndpointMap: Record<string, Endpoint[]> = {
  'facebook.com': [
    { path: '/profile', methods: ['GET', 'POST', 'PUT', 'DELETE'], needsAuth: true },
    { path: '/feed', methods: ['GET'] },
    { path: '/notifications', methods: ['GET'] },
    { path: '/messages', methods: ['GET'] }
  ],
  'google.com': [
    { path: '/search', methods: ['GET'] },
    { path: '/maps', methods: ['GET'] },
    { path: '/mail', methods: ['GET'] },
    { path: '/drive', methods: ['GET'] }
  ],
  'youtube.com': [
    { path: '/home', methods: ['GET'], needsAuth: true },
    { path: '/trending', methods: ['GET'] },
    { path: '/subscriptions', methods: ['GET'], needsAuth: true },
    { path: '/history', methods: ['GET'], needsAuth: true }
  ],
  'stackoverflow.com': [
    { path: '/questions', methods: ['GET', 'POST'], needsAuth: true },
    { path: '/tags', methods: ['GET'] },
    { path: '/users', methods: ['GET'] },
    { path: '/search', methods: ['GET'] }
  ],
  'github.com': [
    { path: '/repositories', methods: ['GET', 'POST', 'PUT', 'DELETE'], needsAuth: true },
    { path: '/explore', methods: ['GET'] },
    { path: '/notifications', methods: ['GET'], needsAuth: true },
    { path: '/messages', methods: ['GET'], needsAuth: true }
  ],
  'twitter.com': [
    { path: '/home', methods: ['GET'], needsAuth: true },
    { path: '/explore', methods: ['GET'], needsAuth: true },
    { path: '/notifications', methods: ['GET'], needsAuth: true },
    { path: '/messages', methods: ['GET'], needsAuth: true }
  ],
  'instagram.com': [
    { path: '/home', methods: ['GET'], needsAuth: true },
    { path: '/explore', methods: ['GET'], needsAuth: true },
    { path: '/notifications', methods: ['GET'], needsAuth: true },
    { path: '/messages', methods: ['GET'], needsAuth: true }
  ]
}
function randomUserAgent() {
  const agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0', // Firefox on Windows 10
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15', // Safari on macOS Catalina
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Chrome on Linux
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1', // Safari on iPhone
    'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1', // Safari on iPad
    'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0' // Firefox on Android
  ]
  return agents[Math.floor(Math.random() * agents.length)]
}
function randomRemote() {
  const remotes = ['127.0.0.1:51952']
  return remotes[Math.floor(Math.random() * remotes.length)]
}
function randomSize() {
  return Math.floor(Math.random() * 10000)
}
function randomStatus(method: HttpMethod) {
  const statuses = methodStatusMap[method]
  return statuses[Math.floor(Math.random() * statuses.length)]
}
function randomTook() {
  return Math.floor(Math.random() * 10000000)
}
function randomHost() {
  const hosts = Object.keys(hostEndpointMap)
  return hosts[Math.floor(Math.random() * hosts.length)]
}
function randomEndpoint(host: string) {
  const endpoints = hostEndpointMap[host]
  return endpoints[Math.floor(Math.random() * endpoints.length)]
}
export function generateRandomLog() {
  const host = randomHost()
  const endpoint = randomEndpoint(host)
  const method = endpoint.methods[Math.floor(Math.random() * endpoint.methods.length)]
  const status = randomStatus(method)

  const headers = {
    accept: 'application/json',
    'user-agent': randomUserAgent(),
    ...(endpoint.needsAuth ? { authorization: `Bearer ${randomToken()}` } : {})
  }
  return {
    http_request: {
      headers: headers,
      host: host,
      method: method,
      path: endpoint.path,
      remote: randomRemote(),
      scheme: 'http'
    },
    http_response: {
      headers: {
        'cache-control': 'private, no-cache, no-store, must-revalidate',
        'content-type': 'application/json; charset=utf-8'
      },
      size: randomSize(),
      status: status,
      text_status: statusTextMap[status],
      took: randomTook()
    },
    level: 'info',
    msg: 'completed handling request',
    time: new Date().toISOString()
  }
}
