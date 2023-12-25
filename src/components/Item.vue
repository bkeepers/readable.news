<script setup>
/* eslint-disable vue/prop-name-casing */
import RelativeDate from './RelativeDate.vue'
import { computed } from 'vue'

const props = defineProps({
  id: String,
  title: String,
  url: String,
  external_url: String,
  image: String,
  excerpt: String,
  date_published: String,
  authors: Array,
  skeleton: Boolean
})

const domain = computed(() => props.url && new URL(props.url).hostname)
const author = props.authors?.[0]
</script>

<template>
  <div
    v-if="skeleton"
    class="item animate-pulse"
  >
    <div class="item-cover" />
    <div class="item-body">
      <div class="item-author opacity-50 mb-2">
        <div class="w-3 h-3 rounded skeleton-text" />
        <div class="skeleton-text h-3 w-[50%]" />
      </div>
      <div class="item-title">
        <div class="skeleton-text h-5 max-w-[95%] mb-2.5" />
        <div class="skeleton-text h-5 max-w-[50%] mb-2.5" />
      </div>
      <div class="item-excerpt">
        <div class="skeleton-text h-2 max-w-[95%] mb-2.5" />
        <div class="skeleton-text h-2 max-w-[75%] mb-2.5" />
      </div>
    </div>
    <div class="item-footer">
      <div class="skeleton-text h-2 w-6" />
    </div>
  </div>
  <router-link
    v-else
    :to="{ name: 'item', params: { id } }"
    class="item"
  >
    <img
      v-if="image"
      :src="image"
      class="item-cover"
    >
    <div
      v-else
      class="item-cover"
    />
    <div class="item-body">
      <div
        v-if="author"
        class="item-author"
      >
        <img
          v-if="author.avatar"
          class="avatar"
          :src="author.avatar"
        >
        {{ author.name || domain }}
      </div>
      <h2
        class="item-title"
        :title="title"
      >
        {{ title }}
      </h2>
      <p
        class="item-excerpt"
        :title="excerpt"
      >
        {{ excerpt }}
      </p>
    </div>
    <div class="item-footer">
      <RelativeDate :value="date_published" />
    </div>
  </router-link>
</template>

<style scoped>
.item {
  @apply border dark:border-slate-900/50 bg-white dark:bg-slate-800 shadow-md shadow-slate-600/10 rounded-lg overflow-hidden flex flex-col;
}

.item-author {
  @apply flex gap-2 place-items-center text-xs mb-2 text-slate-500 truncate;
}

.item-body {
  @apply p-4 grow;
}

.item-title {
  @apply text-lg m-0 font-medium mb-3 leading-6 line-clamp-2;
}

.item-excerpt {
  @apply text-xs text-slate-500 line-clamp-2;
}

.item-footer {
  @apply px-4 py-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-700 font-semibold;
}

.item-cover {
  @apply aspect-[1.9/1] object-cover shadow-inner relative overflow-hidden bg-slate-200 dark:bg-slate-700 border-none outline-none;
}

.skeleton-text {
  @apply bg-slate-200 rounded-full dark:bg-slate-700;
}
</style>
