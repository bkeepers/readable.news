export default function ({ text, url }) {
  return {
    content_text: text,
    author: {
      url: url
    }
  }
}
