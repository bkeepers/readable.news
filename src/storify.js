export default async (date = new Date()) => {
  const endTime = Math.round(new Date(date).getTime() / 1000);
  const startTime = Math.round(new Date(date).getTime() / 1000) - (24 * 60 * 60);

  const res = await fetch(`https://hn.algolia.com/api/v1/search?numericFilters=created_at_i>${startTime},created_at_i<${endTime}`);
  return (await res.json()).hits.slice(0, 10).map(({title, created_at, url, objectID}) =>  {
    const id = `https://news.ycombinator.com/item?id=${objectID}`
    return {
      id,
      url,
      external_url: id,
      title,
      date_published: created_at
    }
  });
}
