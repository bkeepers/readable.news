import { parseHTML } from 'linkedom';

export default async function (url) {
  const res = await fetch(url);

  return {
    url: res.url,
    contentType: res.headers.get('Content-Type').split(';')[0],
    text: await res.text(),
  }
}
