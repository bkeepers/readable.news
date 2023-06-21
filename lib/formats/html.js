import { Readability } from '@mozilla/readability';
import ogs from 'open-graph-scraper';
import { parseHTML } from 'linkedom';
import truncate from 'truncate-html';

// Resolve relative urls to absolute from given base
function resolveUrl(url, base) {
  return url && new URL(url, base).toString();
}

// Convert all relative urls to absolute in the given document
// In the future linkedom may handle this: https://github.com/WebReflection/linkedom/pull/154
function relativeToAbsolute(document, base) {
  const elements = {
    'a': 'href',
    'img': 'src',
    'og:image': 'content',
    'link[rel]': 'href'
  }

  for(const [selector, attribute] of Object.entries(elements)) {
    Array.from(document.querySelectorAll(selector)).forEach(element => {
      element[attribute] = resolveUrl(element[attribute], base)
    })
  }

  return document
}

export default async function ({ text, url }) {
  const { document } = parseHTML(text, { url: url }).window;
  const article = new Readability(relativeToAbsolute(document, url)).parse();

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
