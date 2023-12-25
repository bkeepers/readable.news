import { computed, unref } from 'vue'
import { useStorage, useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'

function urlFor (path, params) {
  const url = new URL(path, window.location)
  url.search = new URLSearchParams(unref(params))
  return url.toString()
}

export const useFeedStore = defineStore('feed', () => {
  const params = useStorage('params', { period: '3d' })

  const formats = {
    'JSON Feed': computed(() => urlFor('/api/feed', params.value)),
    RSS: computed(() => urlFor('/api/feed', { format: 'rss', ...params.value })),
    Atom: computed(() => urlFor('/api/feed', { format: 'atom', ...params.value }))
  }

  const fetch = useFetch(formats['JSON Feed'], { refetch: true }).json()
  const items = computed(() => fetch.data.value?.items)

  function find (id) {
    return computed(() => {
      return fetch.data.value?.items?.find(item => item.id === id)
    })
  }

  return { items, params, formats, find, ...fetch }
})
