export default async function (url) {
  const res = await fetch(url);

  if(!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  }

  return {
    url: res.url,
    status: res.status,
    contentType: res.headers.get('Content-Type').split(';')[0],
    text: await res.text(),
  }
}
