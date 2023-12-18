# [Readable News](https://readable.news)

Social news made into a readable feed.

1. 📰 Gets the latest news from social news sites (currently only Hacker News)
2. 🧹 Runs them through [Mozilla's readability](https://github.com/mozilla/readability) library
3. 📦 Packages them into a feed

## Try It Out

Visit https://readable.news and subscribe in your favorite feed reader.

## Contributing

Readable News is written in JavaScript, with an [API](./api) running on [Vercel](https://vercel.com) and a [frontend](./src) built with [Vue](https://vuejs.org).

You can run it locally with:

```
$ yarn install
$ vercel dev
```

## License

[AGPL-3.0](./LICENSE)
