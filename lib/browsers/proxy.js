import { request as fetch } from './fetch.js'
import { HttpsProxyAgent } from 'https-proxy-agent'

const { PROXY_URL } = process.env

// Disable certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

export const name = 'proxy'

export function request (url, options = {}) {
  return fetch(url, { agent: new HttpsProxyAgent(PROXY_URL), ...options })
}
