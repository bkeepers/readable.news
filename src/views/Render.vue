<script setup>
import { useFetch } from '@vueuse/core';
import { useRouter } from 'vue-router'
import { computed, watchEffect, reactive } from 'vue'
import Reader from '../components/Reader.vue'

const router = useRouter()
const props = defineProps({
  url: String
})

const url = computed({
  get: () => props.url && decodeURIComponent(props.url),
  set: (value) => router.push({ params: { url: encodeURIComponent(value) } })
})

const fetch = reactive(useFetch(computed(() => {
  if(!url.value) return

  const api = new URL('/api/readable', window.location)
  api.search = new URLSearchParams({url: url.value})
  return api.toString()
}), { immediate: false }).json())

watchEffect(() => {
  url.value && fetch.execute()
})
</script>

<template>
  <div class="container max-w-[65ch] sm:prose-lg md:prose-xl mx-auto p-4 md:p-8 lg:p-12 flex gap-4">
    <div class="grow">
      <input type="text" v-model.lazy="url" placeholder="" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">GO</button>
  </div>

  <Reader v-if="url && fetch.data" :item="fetch.data" class="p-4 md:p-8 lg:p-12" />
</template>
