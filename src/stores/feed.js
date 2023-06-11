import { computed, unref } from 'vue'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

export const useFeedStore = defineStore('feed', () => {
  const params = useStorage('params', { period: '3d' })

  const api = computed(() => {
    const url = new URL('/api/feed', window.location)
    url.search = new URLSearchParams(unref(params))
    return url.toString()
  })

  const fetch = useFetch(api, { refetch: true }).json()
  const items = computed(() => fetch.data.value?.items)

  function find(id) {
    return computed(() => {
      return fetch.data.value?.items?.find(item => item.id === id)
    })
  }

  return { items, params, find, ...fetch }
})
