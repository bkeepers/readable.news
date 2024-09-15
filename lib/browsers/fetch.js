import fetch from 'node-fetch'

export const name = 'fetch'

export async function request (url, options = {}) {
  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  }

  return {
    url: res.url,
    status: res.status,
    contentType: res.headers.get('Content-Type').split(';')[0],
    text: await res.text()
  }
}
