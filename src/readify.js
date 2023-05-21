var { Readability } = require('@mozilla/readability');
const { parseHTML} = require('linkedom');
const truncate = require('truncate-html')

module.exports = async (url, item = {}) => {
  const res = await fetch(url);
  var doc = parseHTML(await res.text(), { url });
  let reader = new Readability(doc.window.document);
  let article = reader.parse();

  return {
    item: {
      title: article.title,
      link: url,
      description: truncate(article.content, 4000, { byWords: true }),
      ...item
    }
  }
}
