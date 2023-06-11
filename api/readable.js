import readify from '../lib/readify.js';

// Cache for 1 hour
const cacheControl = 'max-age=3600, s-maxage=3600, stale-while-revalidate';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', cacheControl)
  res.setHeader('Content-Type', 'application/json');
  return res.json(await readify({ url: req.query.url }));
}
