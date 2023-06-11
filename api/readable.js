import { Readability } from '@mozilla/readability';
import ogs from 'open-graph-scraper';
import { parseHTML } from 'linkedom';
import truncate from 'truncate-html';

// Cache for 1 hour
const cacheControl = 'max-age=3600, s-maxage=3600, stale-while-revalidate';

function resolveUrl(url, base) {
  if(!url) return;

  return url && new URL(url, base).toString();
}

const formats = {
  'text/html': async (res) => {
    const html = await res.text()
    const article = new Readability(parseHTML(html, { url: res.url }).window.document).parse();
    const og = (await ogs({ html })).result

    return {
      content_html: truncate(article.content, 4000, { byWords: true }),
      excerpt: article.excerpt,
      image: resolveUrl(og?.ogImage?.[0]?.url, res.url),
      authors: [{
        name: article.siteName || og.ogSiteName || article.byline,
        url: res.url,
        avatar: resolveUrl(og.favicon, res.url)
      }]
    }
  },
  'text/plain': async (res) => {
    return {
      content_text: await res.text(),
      author: {
        url: res.url
      }
    }
  }
}

async function readable (item) {
  if(!item.url) return item
  try {
    const res = await fetch(item.url);
    const contentType = res.headers.get('Content-Type').split(';')[0];
    if(!formats[contentType]) throw new Error(`Unknown Content-Type for ${item.url}: ${contentType}`)
    return { ...item, ...await formats[contentType](res) || {} }
  } catch (err) {
    console.error(`Failed to parse ${item.url}`, err)
    return item
  }
}


export default async function handler(req, res) {
  res.setHeader('Cache-Control', cacheControl)
  res.setHeader('Content-Type', 'application/json');
  return res.json(await readable({ url: req.query.url }));
}
