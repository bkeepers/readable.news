<script setup>
/* eslint-disable vue/no-v-html */
import { computed } from 'vue'
import RelativeDate from '../components/RelativeDate.vue'
import DOMPurify from 'dompurify'

const props = defineProps({
  item: Object
})

const domain = computed(() => props.item?.url && new URL(props.item?.url).hostname)
</script>

<template>
  <div
    class="mx-auto prose prose-slate sm:prose-lg md:prose-xl dark:prose-invert p-4 md:p-8 lg:p-12 prose-img:max-w-full prose-img:mx-auto prose-img:block"
  >
    <figure
      v-if="item.image"
      class="mb-4 md:mb-8 lg:mb-12 -mt-4 md:-mt-8 lg:-mt-4"
    >
      <img :src="item.image">
    </figure>
    <div class="not-prose border-b pb-4 mb-4 flex flex-col gap-2">
      <div
        v-if="item.authors?.[0]"
        class="flex gap-2 place-items-center text-xs text-slate-500 truncate"
      >
        <img
          v-if="item.authors[0].avatar"
          class="avatar"
          :src="item.authors[0].avatar"
        >
        {{ item.authors[0].name || domain }}
      </div>
      <h1 class="text-3xl md:text-4xl lg:text-5xl">
        <a
          :href="item.url"
          class="hover:text-slate-900 dark:hover:text-white hover:underline"
        >{{ item.title }}</a>
      </h1>
      <div
        v-if="item.date_published"
        class="text-sm"
      >
        <RelativeDate
          :value="item.date_published"
          class="font-bold text-slate-500/75"
        />
      </div>
      <div
        v-if="item.external_url"
        class="text-sm"
      >
        Link: <a :href="item.external_url">{{ item.external_url }}</a>
      </div>
    </div>

    <div
      v-if="item.content_html"
      v-html="DOMPurify.sanitize(item.content_html)"
    />
    <div
      v-if="item.content_text"
      v-text="item.content_text"
    />
  </div>
</template>

<style scoped>
picture,
figure {
  @apply block -mx-4 md:-mx-8 lg:-mx-12;
}
</style>
