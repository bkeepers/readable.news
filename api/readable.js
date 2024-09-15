import browsers from '../lib/browsers/index.js'
import formats from '../lib/formats/index.js'

// Cache for 12 hours
const age = 60 * 60 * 12
const cacheControl = `public, max-age=${age}, s-maxage=${age}, stale-while-revalidate`

async function readable (url) {
  let lastError = null

  for (const browser of browsers) {
    try {
      console.debug(`Getting ${url} with ${browser.name}`)
      const { contentType, text } = await browser.request(url)

      if (!formats[contentType]) {
        throw new Error(`Unknown Content-Type: ${contentType}`)
      }

      const item = await formats[contentType]({ text, url })
      return item
    } catch (err) {
      console.error(`Failed to request ${url} with ${browser.name}.`, err)
      lastError = err
    }
  }

  // All browsers failed
  throw lastError
}

export default async function handler (req, res) {
  const { url } = req.query

  console.log(`Making readable ${url}`)

  try {
    const item = await readable(url)
    res.setHeader('Cache-Control', cacheControl)
    res.setHeader('Content-Type', 'application/json')
    res.json(item)
  } catch (err) {
    console.error(`Failed to parse ${url}`, err)
    res.status(422).json({ url, error: err.message })
  }
}
