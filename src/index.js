const express = require('express');
const storify = require ('./storify');
const readify = require('./readify');

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  const feed = {
    version: "https://jsonfeed.org/version/1",
    title: "Hacker News Feed",
    home_page_url: "https://feedify.herokuapp.com/",
    feed_url: "https://feedify.herokuapp.com/",
    items: await Promise.all((await storify()).map(readify))
  }

  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(feed, null, 2));
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
