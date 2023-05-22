const express = require('express');
const storify = require ('./storify');
const readify = require('./readify');
const feedify = require('./feedify');

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  const stories = await storify()

  const articles = (await Promise.all(stories.map(async ({ title, created_at, url, author, objectID }) => {
    const comments = `https://news.ycombinator.com/item?id=${objectID}`
    if(!url) url = comments;

    console.log('fetching', url)
    try {
      return {
        item: [
          { title },
          { pubDate: new Date(created_at).toUTCString() },
          { link: url },
          { comments: comments },
          ...await readify(url)
        ]
      };
    } catch(e) {
      console.error(`Failed to parse ${url}`, e)
    }
  }))).filter(Boolean);

  res.set('Content-Type', 'text/xml');
  res.send(feedify(articles));
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
