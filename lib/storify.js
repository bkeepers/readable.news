const stories = 30
const PERIODS = {
  "24h": 24,
  "3d": 24 * 3,
  "1w": 24 * 7,
  "30d": 24 * 30,
  "1y": 24 * 365,
}

export default async ({ period }) => {
  const duration = (PERIODS[period] || PERIODS["3d"]) * 60 * 60
  const endTime = Math.round(new Date().getTime() / 1000);
  const startTime = endTime - duration;

  const res = await fetch(`https://hn.algolia.com/api/v1/search?numericFilters=created_at_i>${startTime},created_at_i<${endTime}`);
  return (await res.json()).hits.slice(0, stories).map(({title, created_at, url, objectID}) =>  {
    return {
      id: objectID,
      url,
      external_url: `https://news.ycombinator.com/item?id=${objectID}`,
      title,
      date_published: created_at
    }
  });
}
