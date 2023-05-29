import { Readability } from '@mozilla/readability';
import ogs from 'open-graph-scraper';
import { parseHTML } from 'linkedom';
import truncate from 'truncate-html';

async function htmlToArticle(res) {
  const html = await res.text()

  const article = new Readability(parseHTML(html, { url: res.url }).window.document).parse();
  const og = (await ogs({ html })).result

  return {
    content_html: truncate(article.content, 4000, { byWords: true }),
    excerpt: article.excerpt,
    image: og?.ogImage?.[0]?.url,
    author: {
      name: article.siteName || article.byline || og.ogSiteName || article.title,
      url: res.url
    }
  }
}

async function textToArticle(res) {
  return {
    content_text: await res.text(),
    author: {
      url: res.url
    }
  }
}

export default async (item) => {
  if(!item.url) return item
  try {
    const res = await fetch(item.url);
    const contentType = res.headers.get('Content-Type').split(';')[0];
    if(contentType === "text/html") {
      return Object.assign(item, await htmlToArticle(res));
    } else if (contentType === "text/plain") {
      return Object.assign(item, await textToArticle(res));
    } else {
      throw new Error(`Unknown Content-Type for ${item.url}: ${contentType}`);
    }
  } catch (err) {
    console.error(`Failed to parse ${item.url}`, err)
    return item
  }
}
