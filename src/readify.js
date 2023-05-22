var { Readability } = require('@mozilla/readability');
const { parseHTML} = require('linkedom');
const truncate = require('truncate-html')

async function htmlToArticle(res) {
  var doc = parseHTML(await res.text(), { url: res.url });
  let reader = new Readability(doc.window.document);
  let article = reader.parse();

  return [
    { description: truncate(article.content, 4000, { byWords: true }) },
    { _name: 'source', _attrs: { url: res.url }, _content: article.siteName || article.byline || article.title || res.url }
  ]
}

async function textToArticle(res) {
  return [
    { description: await res.text() },
    { _name: 'source', _attrs: { url: res.url }, _content: res.url }
  ]
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
