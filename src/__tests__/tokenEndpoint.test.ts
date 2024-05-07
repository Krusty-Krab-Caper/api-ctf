import { buildServer } from './helper'

describe('POST /token', () => {
  const app = buildServer()

  it('should return 400 if no grant_type is provided', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/token',
      payload: {}
    })

    expect(response.statusCode).toBe(400)
    expect(response.json()).toEqual({
      code: 400,
      message: expect.stringContaining('grant_type')
    })
  })

  it('should return 400 if grant_type is not supported', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/token',
      payload: {
        grant_type: 'unsupported_grant_type'
      }
    })

    expect(response.statusCode).toBe(400)
    expect(response.json()).toEqual({
      code: 400,
      message: expect.stringContaining('grant_type')
    })
  })

  it('should return 401 if client_id is invalid', async () => {
    const auth = Buffer.from('invalid_client_id:invalid_client_secret').toString('base64')
    const response = await app.inject({
      method: 'POST',
      url: '/token',
      payload: {
        grant_type: 'client_credentials'
      },
      headers: {
        authorization: `Basic ${auth}`
      }
    })

    expect(response.statusCode).toBe(401)
    expect(response.json()).toEqual({
      code: 401,
      message: expect.stringContaining('Not Authorized')
    })
  })

  it('should return 200 with random token if credentials are valid', async () => {
    const auth = Buffer.from('valid_client_id:valid_client_secret').toString('base64')
    const response = await app.inject({
      method: 'POST',
      url: '/token',
      payload: {
        grant_type: 'client_credentials'
      },
      headers: {
        authorization: `Basic ${auth}`
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      access_token: expect.any(String),
      expires_in: 3599,
      scope: '',
      token_type: 'bearer'
    })
  })
})
