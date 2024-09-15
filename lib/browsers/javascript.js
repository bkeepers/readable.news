import { request as fetch } from './proxy.js'

const headers = { 'X-SU-Headless': 'html' }

export const name = 'javascript'

export function request (url, options = {}) {
  return fetch(url, { headers, ...options })
}
