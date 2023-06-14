import puppeteer from 'puppeteer-core'

const { BROWSERLESS_TOKEN } = process.env;

async function withBrowser(fn) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_TOKEN}`,
  })
  try {
    return await fn(browser)
  } finally {
    browser.close()
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
