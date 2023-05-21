module.exports = async (date = new Date()) => {
  const endTime = Math.round(new Date(date).getTime() / 1000);

  // 1 hour before start of the date (save missed posts)
  const startTime = Math.round(new Date(date).getTime() / 1000) - (25 * 60 * 60);

  const res = await fetch(`https://hn.algolia.com/api/v1/search?numericFilters=created_at_i>${startTime},created_at_i<${endTime}`);
  return (await res.json()).hits.slice(0, 10);
}
