import storify from '../lib/storify.js'
import jsonfeedToRSS from 'jsonfeed-to-rss'
import jsonfeedToAtom from 'jsonfeed-to-atom'
import { APP_URL } from '../lib/settings.js'

const cacheControl = 'public, max-age=900, s-maxage=900, stale-while-revalidate'

async function readify (item, fetchOptions = {}) {
  if (!item.url) return item

  const api = `${APP_URL}/api/readable?url=${encodeURIComponent(item.url)}`

  try {
    const res = await fetch(api, fetchOptions)
    if (res.ok) {
      return { ...await res.json(), ...item }
    } else {
      return { ...item, content_html: (await res.json()).error }
    }
  } catch (err) {
    console.error(`Error fetching ${api}`, err)
    return item
  }
}

export default async function handler (req, res) {
  const { format, period } = req.query

  const controller = new AbortController()
  const signal = controller.signal
  setTimeout(() => controller.abort(), Number(process.env.APP_TIMEOUT) || 30000)

  const feed = {
    version: 'https://jsonfeed.org/version/1',
    title: 'Readable: Hacker News',
    home_page_url: APP_URL,
    feed_url: `${APP_URL}/api/feed?format=${format || 'json'}`,
    icon: 'https://news.ycombinator.com/y18.svg',
    favicon: 'https://news.ycombinator.com/favicon.ico',
    items: await Promise.all((await storify({ period })).map(item => readify(item, { signal })))
  }

  res.setHeader('Cache-Control', cacheControl)

  if (format === 'rss') {
    res.setHeader('Content-Type', 'application/rss+xml')
    return res.send(jsonfeedToRSS(feed))
  } else if (format === 'atom') {
    res.setHeader('Content-Type', 'application/atom+xml')
    return res.send(jsonfeedToAtom(feed))
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.json(feed)
  }
}
