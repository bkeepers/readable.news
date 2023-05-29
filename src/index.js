import express from 'express';
import storify from './storify.js';
import readify from './readify.js';
import jsonfeedToRSS from 'jsonfeed-to-rss';
import jsonfeedToAtom from 'jsonfeed-to-atom';

const app = express()
const port = process.env.PORT || 3000

async function feed() {
  return {
    version: "https://jsonfeed.org/version/1",
    title: "Hacker News Feed",
    home_page_url: "https://feedify.herokuapp.com/",
    feed_url: "https://feedify.herokuapp.com/",
    icon: "https://news.ycombinator.com/y18.svg",
    favicon: "https://news.ycombinator.com/favicon.ico",
    items: await Promise.all((await storify()).map(readify))
  }
}

app.get('/', (req, res) => {
  res.redirect('/feed.json')
})

app.get('/feed.json', async (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(await feed(), null, 2));
})

app.get('/feed.rss', async (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.send(jsonfeedToRSS(await feed()));
})

app.get('/feed.atom', async (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.send(jsonfeedToAtom(await feed()));
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
