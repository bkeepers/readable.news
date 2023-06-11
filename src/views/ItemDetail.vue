<script setup>
import { computed } from 'vue'
import { useFeedStore } from '../stores/feed.js'
import RelativeDate from '../components/RelativeDate.vue'
import DOMPurify from "dompurify";

const props = defineProps({
  id: String
})

const item = useFeedStore().find(props.id)
const domain = computed(() => item?.url && new URL(item?.url).hostname)
</script>

<template>
  <div v-if="item" class="mx-auto prose prose-slate sm:prose-lg md:prose-xl dark:prose-invert p-4 md:p-8 lg:py-16 prose-img:w-full">
    <base :href="item.url" />
    <div class="not-prose border-b pb-4 mb-4 flex flex-col gap-2">
      <div v-if="item.authors?.[0]" class="flex gap-2 place-items-center text-xs text-slate-500 truncate">
        <img v-if="item.authors[0].avatar" class="avatar" :src="item.authors[0].avatar" />
        {{ item.authors[0].name || domain }}
      </div>
      <h1 class="text-3xl md:text-4xl lg:text-5xl">
        <a :href="item.url" class="hover:text-slate-900 hover:underline">{{ item.title }}</a>
      </h1>
      <div class="text-sm">
        <RelativeDate :value="item.date_published" class="font-bold text-slate-500/75" />
      </div>
      <div class="text-sm">
        Link: <a :href="item.external_url">{{ item.external_url }}</a>
      </div>
    </div>

    <div v-if="item.content_html" v-html="DOMPurify.sanitize(item.content_html)"></div>
    <div v-if="item.content_text" v-text="item.content_text"></div>
  </div>
</template>

<style scoped>
picture, figure {
  @apply block -mx-4 md:-mx-8;
}
</style>
