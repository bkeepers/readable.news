import pre from './pre.js';
import absolute from './absolute.js'

const processors = [pre, absolute]

export default function(document, options) {
  processors.forEach(processor => processor(document, options))
  return document
}
