import { time } from 'console'
import { randomToken } from './randomLog'

const targetEmplid = '12345'
const targetToken = randomToken()
const targetHeaders = {
  accept: 'application/json',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  authorization: 'Bearer ' + targetToken
}
const targetLog = {
  http_request: {
    headers: {
      ...targetHeaders
    },
    host: 'localhost:4445',
    method: 'GET',
    path: '/oauth/clients',
    query: 'emplid=' + targetEmplid,
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

const tokenEmployeeEndpoint = randomToken()
const tokenPayrollEndpoint = randomToken()

export const plantedLogs = [
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenEmployeeEndpoint
      },
      path: '/employee',
      method: 'GET',
      query: ''
    },
    time: new Date().toISOString()
  },
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenEmployeeEndpoint
      },
      path: '/employee',
      method: 'POST',
      query: ''
    },
    time: new Date().toISOString()
  },
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenEmployeeEndpoint
      },
      path: '/employee',
      method: 'GET',
      query: ''
    },
    time: new Date().toISOString()
  },
  targetLog,
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenPayrollEndpoint
      },
      path: '/payroll',
      method: 'GET',
      query: 'emplid=' + targetEmplid
    },
    time: new Date().toISOString()
  },
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenPayrollEndpoint
      },
      path: '/payroll',
      method: 'GET',
      query: 'emplid=' + targetEmplid
    },
    time: new Date().toISOString()
  }
]
