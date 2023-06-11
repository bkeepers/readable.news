import storify from '../lib/storify.js';
import jsonfeedToRSS from 'jsonfeed-to-rss';
import jsonfeedToAtom from 'jsonfeed-to-atom';

const { VERCEL_ENV, VERCEL_URL } = process.env;
const url = (VERCEL_ENV === 'production' ? `https://` : `http://`) + VERCEL_URL;
const cacheControl = 'max-age=900, s-maxage=900, stale-while-revalidate';

async function readify(item) {
  const api = `${url}/api/readable?url=${encodeURIComponent(item.url)}`;
  const res = await fetch(api);
  return { ...item, ...await res.json() }
}

export default async function handler(req, res) {
  const { format, period } = req.query;

  res.setHeader('Cache-Control', cacheControl);
  const feed = {
    version: "https://jsonfeed.org/version/1",
    title: "Readable: Hacker News",
    home_page_url: url,
    feed_url: `${url}/api/feed?format=${format || 'json'}`,
    icon: "https://news.ycombinator.com/y18.svg",
    favicon: "https://news.ycombinator.com/favicon.ico",
    items: await Promise.all((await storify({ period })).map(readify))
  };

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
