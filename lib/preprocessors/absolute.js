const elements = {
  a: 'href',
  img: 'src',
  'og:image': 'content',
  'link[rel]': 'href'
}

// Convert all relative urls to absolute in the given document
// In the future linkedom may handle this: https://github.com/WebReflection/linkedom/pull/154
export default function relativeToAbsolute (document, { url }) {
  for (const [selector, attribute] of Object.entries(elements)) {
    document.querySelectorAll(selector).forEach(element => {
      if (element[attribute]) {
        element[attribute] = new URL(element[attribute], url).toString()
      }
    })
  }
}
