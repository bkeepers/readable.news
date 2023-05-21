var { Readability } = require('@mozilla/readability');
const { parseHTML} = require('linkedom');
const { toXML } = require('jstoxml');
const truncate = require('truncate-html')

async function getIt(date = new Date()) {
  const endTime = Math.round(new Date(date).getTime() / 1000);
  // 1 hour before start of the date (save missed posts)
  const startTime = Math.round(new Date(date).getTime() / 1000) - (25 * 60 * 60);
  const res = await fetch(`https://hn.algolia.com/api/v1/search?numericFilters=created_at_i>${startTime},created_at_i<${endTime}`);
  const top10Objs = (await res.json()).hits.slice(0, 10);
  const articles = (await Promise.all(top10Objs.map(async (obj, i) => {
    let { title, created_at, url, author, points, objectID, num_comments } = obj;
    if(!url) url = `https://news.ycombinator.com/item?id=${objectID}`;

    // console.log('fetching', url)
    const res = await fetch(url);
    var doc = parseHTML(await res.text(), { url });
    try {
      let reader = new Readability(doc.window.document);
      let article = reader.parse();

      return {
        item: {
          title,
          link: url,
          pubDate: created_at,
          description: truncate(article.content, 4000, { byWords: true }),
        }
      }
    } catch(e) {
      // console.error(`Failed to parse ${url}`, e)
    }
  }))).filter(Boolean);

  const feed = {
    _name: 'rss',
    _attrs: {
        version: '2.0'
    },
    _content: {
      channel: [
        { title: "Hacker News Feed" },
        // { link: "" },
        // { description: "" },
        { language: "en-US" },
        ...articles
      ]
    },
  };

  console.log(toXML(feed, { header: true, indent: '  ' }))
}

getIt()
