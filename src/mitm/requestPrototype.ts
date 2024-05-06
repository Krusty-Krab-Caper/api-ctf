export const requestPrototype = {
  http_request: {
    headers: {
      accept: 'application/json',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    host: 'localhost:8080',
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
