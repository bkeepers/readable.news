import puppeteer from 'puppeteer-core'
import { createPool } from 'generic-pool'

const { BROWSERLESS_TOKEN } = process.env;

const pool = createPool({
  create() {
    return puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_TOKEN}`,
    })
  },
  destroy(browser) {
    browser.close()
  }
}, { min: 1, max: 10 })

async function withBrowser(fn) {
  const browser = await pool.acquire()
  try {
    return await fn(browser)
  } finally {
    pool.release(browser)
  }
}

export default function (url) {
  return withBrowser(async browser => {
    const page = await browser.newPage()
    const response = await page.goto(url, { waitUntil: 'networkidle0', });

    return {
      url: response.url(),
      status: response.status(),
      contentType: response.headers()['content-type'],
      text: await page.content()
    }
  })
}
