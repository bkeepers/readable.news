import readify from '../lib/readify.js';

// Cache for 1 hour
const cacheControl = 's-maxage=' + (60 * 60)

export default async function handler(req, res) {
  res.setHeader('Cache-Control', cacheControl)
  res.setHeader('Content-Type', 'application/json');
  return res.json(await readify({ url: req.query.url }));
}
