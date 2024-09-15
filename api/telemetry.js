import { APP_URL, APP_DOMAIN } from '../lib/settings.js'

const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64')

async function event ({ name, url, headers }) {
  console.log(`Recording ${name}: ${url}`)

  const res = await fetch('https://plausible.io/api/event', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      url,
      domain: APP_DOMAIN
    })
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  }
}

export default async function handler (req, res) {
  res.status(200).setHeader('Content-Type', 'image/png').end(PNG)
  const url = `${APP_URL}/#/render/${encodeURIComponent(req.query.url)}`
  await event({ name: 'pageview', headers: req.headers, url })
}
