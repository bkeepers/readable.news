<script setup>
import RelativeDate from './RelativeDate.vue';
import { computed } from 'vue'

const props = defineProps({
  id: String,
  title: String,
  url: String,
  external_url: String,
  image: String,
  excerpt: String,
  date_published: String,
  authors: Array
})

const domain = computed(() => props.url && new URL(props.url).hostname)
const author = props.authors?.[0]
</script>

<template>
  <router-link :to="{ name: 'item', params: { id } }" class="border dark:border-slate-900/50 bg-white dark:bg-slate-800 shadow-md shadow-slate-600/10 rounded-lg overflow-hidden flex flex-col">
    <img :src="image" class="aspect-video object-cover shadow-inner relative overflow-hidden bg-slate-500">
    <div class="p-4 grow">
      <div v-if="author" class="flex gap-2 place-items-center text-xs mb-2 text-slate-500 truncate">
        <img v-if="author.avatar" class="avatar" :src="author.avatar" />
        {{ author.name || domain }}
      </div>
      <h2 class="text-lg m-0 font-medium mb-3 leading-6 line-clamp-2" :title="title">{{ title }}</h2>
      <p class="text-xs text-slate-500 line-clamp-4" :title="excerpt">{{ excerpt }}</p>
    </div>
    <div class="px-4 py-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-700 font-semibold">
      <RelativeDate :value="date_published" />
    </div>
  </router-link>
</template>
