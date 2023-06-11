import storify from '../lib/storify.js';
import readify from '../lib/readify.js';
import jsonfeedToRSS from 'jsonfeed-to-rss';
import jsonfeedToAtom from 'jsonfeed-to-atom';

const cacheControl = 'max-age=' + (60 * 15)

async function createFeed({ period }) {
  return {
    version: "https://jsonfeed.org/version/1",
    title: "Hacker News Feed",
    home_page_url: "https://feedify.herokuapp.com/",
    feed_url: "https://feedify.herokuapp.com/",
    icon: "https://news.ycombinator.com/y18.svg",
    favicon: "https://news.ycombinator.com/favicon.ico",
    items: await Promise.all((await storify({ period })).map(readify))
  }
}


export default async function handler(req, res) {
  const { format } = req.query;

  res.setHeader('Cache-Control', cacheControl)
  const feed = await createFeed(req.query);

  if(format === 'rss') {
    res.setHeader('Content-Type', 'application/rss+xml');
    return res.send(jsonfeedToRSS(feed));
  } else if(format === 'atom') {
    res.setHeader('Content-Type', 'application/atom+xml');
    return res.send(jsonfeedToAtom(feed));
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json(feed);
  }
}
