// Wrap <pre> blocks in <figure> elements, to make sure Readability preserves them.
export default function preservePre (doc) {
  doc.querySelectorAll('pre').forEach(pre => {
    if (pre.parentNode && !pre.parentNode.matches('figure')) {
      const fig = doc.createElement('figure')
      fig.appendChild(pre.cloneNode(true))

      // If the <pre> is the only child (of a <div> or <p>), also remove this parent in the process.
      const toReplace = pre.matches(':only-child') ? pre.parentNode : pre
      toReplace.parentNode.replaceChild(fig, toReplace)
    }
  })
}
