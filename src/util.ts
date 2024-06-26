import * as crypto from 'crypto'

export function sha1(input: string): string {
  const hash = crypto.createHash('sha1')
  hash.update(input)
  return hash.digest('hex')
}

export function randomToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function chooseRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function ErrorResponse(code: number, message: string) {
  return {
    code,
    message
  }
}
