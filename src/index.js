const express = require('express');
const storify = require ('./storify');
const readify = require('./readify');
const feedify = require('./feedify');

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  const stories = await storify()

  const articles = (await Promise.all(stories.map(async ({ title, created_at, url, objectId }) => {
    if(!url) url = `https://news.ycombinator.com/item?id=${objectID}`;

    console.log('fetching', url)
    try {
      return await readify(url, { title, pubDate: created_at });
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
