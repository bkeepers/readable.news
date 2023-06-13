import { Readability } from '@mozilla/readability';
import ogs from 'open-graph-scraper';
import { parseHTML } from 'linkedom';
import truncate from 'truncate-html';

function resolveUrl(url, base) {
  if(!url) return;
  return url && new URL(url, base).toString();
}

export default async function ({ text, url }) {
  const { document } = parseHTML(text, { url: url }).window;
  const article = new Readability(document).parse();

  if(!article) throw new Error(`Failed to make url readable: ${url}`)

  const og = (await ogs({ html: text })).result

  return {
    title: article.title,
    content_html: truncate(article.content, 4000, { byWords: true }),
    excerpt: article.excerpt,
    image: resolveUrl(og?.ogImage?.[0]?.url, url),
    authors: [{
      name: article.siteName || og.ogSiteName || article.byline,
      url,
      avatar: resolveUrl(og.favicon, url)
    }]
  }
}
