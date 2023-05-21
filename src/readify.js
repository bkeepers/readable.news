var { Readability } = require('@mozilla/readability');
const { parseHTML} = require('linkedom');
const truncate = require('truncate-html')

async function htmlToArticle(res) {
  var doc = parseHTML(await res.text(), { url: res.url });
  let reader = new Readability(doc.window.document);
  let article = reader.parse();

  return {
    title: article.title,
    link: res.url,
    description: truncate(article.content, 4000, { byWords: true }),
    author: {
      name: article.byline,
    },
    source: {
      id: res.url,
      title: article.siteName || res.url,
    }
  }

}

async function textToArticle(res) {
  return {
    link: res.url,
    description: await res.text(),
    source: {
      id: res.url,
      title: res.url
    }
  }
}

module.exports = async (url) => {
  const res = await fetch(url);
  const contentType = res.headers.get('Content-Type').split(';')[0];
  if(contentType === "text/html") {
    return await htmlToArticle(res);
  } else if (contentType === "text/plain") {
    return await textToArticle(res);
  } else {
    throw new Error(`Unknown Content-Type for ${url}: ${contentType}`);
  }
}
