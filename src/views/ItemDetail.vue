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
  <div v-if="item" class="mx-auto prose prose-slate md:prose-lg lg:prose-xl dark:prose-invert prose-img:-mx-8 prose-img:w-full">
    <base :href="item.url" />
    <div class="not-prose mb-4">
      <div v-if="item.authors?.[0]" class="flex gap-2 place-items-center text-xs mb-3 text-slate-500 truncate">
        <img v-if="item.authors[0].avatar" class="avatar" :src="item.authors[0].avatar" />
        {{ item.authors[0].name || domain }}
      </div>
      <h1 class="text-4xl border-b pb-2 mb-2"><a :href="item.url">{{ item.title }}</a></h1>
      <div class="text-sm font-bold text-slate-500">
        <RelativeDate :value="item.date_published" />
      </div>
    </div>

    <div v-if="item.content_html" v-html="DOMPurify.sanitize(item.content_html)"></div>
    <div v-if="item.content_text" v-text="item.content_text"></div>
  </div>
</template>
