import * as browsers from '../lib/browsers/index.js'
import formats from '../lib/formats/index.js'

// Cache for 12 hours
const age = 60 * 60 * 12;
const cacheControl = `public, max-age=${age}, s-maxage=${age}, stale-while-revalidate`;

async function readable (url, browser = browsers.node) {
  const { contentType, text } = await browser(url);

  if(!formats[contentType]) {
    throw new Error(`Unknown Content-Type: ${contentType}`)
  }

  try {
    return await formats[contentType]({ text, url })
  } catch (err) {
    console.error(err)
    if(browser === browsers.headless) {
      throw err
    } else {
      console.log(`Trying to parse ${url} with headless browser`)
      return await readable(url, browsers.headless)
    }
  }
}

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const item = await readable(url)
    res.setHeader('Cache-Control', cacheControl)
    res.setHeader('Content-Type', 'application/json');
    res.json(item)
  } catch (err) {
    console.error(`Failed to parse ${url}`, err)
    res.status(422).json({ url, error: err.message })
  }
}
