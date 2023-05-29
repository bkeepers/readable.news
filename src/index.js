import express from 'express';
import logging from 'express-logging';
import storify from './storify.js';
import readify from './readify.js';
import jsonfeedToRSS from 'jsonfeed-to-rss';
import jsonfeedToAtom from 'jsonfeed-to-atom';
import path from "path";

const app = express()
const port = process.env.PORT || 3000
const environment = process.env.NODE_ENV
const manifest = environment === 'production' ? await import(path.join(path.resolve(), "dist", "manifest.json")) : {}

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

app.use(logging(console))

app.get('/feed.json', async (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(await feed(), null, 2));
})

app.get('/feed.rss', async (req, res) => {
  res.set('Content-Type', 'application/rss+xml');
  res.send(jsonfeedToRSS(await feed()));
})

app.get('/feed.atom', async (req, res) => {
  res.set('Content-Type', 'application/atom+xml');
  res.send(jsonfeedToAtom(await feed()));
})

if(environment !== 'production') {
  // Serve static assets in public/
  app.use("/", express.static(path.join(path.resolve(), "public")))

  // Proxy compiled assets through vite
  app.get(/\/src\//, (req, res) => {
    res.redirect(303, `http://localhost:5173${req.path}`);
  });
}

app.get("/*", async (_req, res) => {
  res.render("index.html.ejs", { environment, manifest });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
