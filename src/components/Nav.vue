<script setup>
import Menu from './Menu.vue'
import FeedIcon from './FeedIcon.vue'
import { MenuItem } from '@headlessui/vue'

import { useFeedStore } from '../stores/feed.js'
const feed = useFeedStore()
</script>

<template>
  <div class="sticky border dark:border-slate-950/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg backdrop-brightness-90 top-0 left-0 right-0 shadow-xl">
    <div class="container-xl mx-auto p-4 md:px-8 lg:px-16 flex place-items-center gap-3 flex-wrap">
      <div class="grow">
        <h1 class="font-bold flex gap-3 align-items-middle">
          <router-link
            to="/"
            class="text-xl lg:text-2xl text-black dark:text-white"
          >
            Readable
          </router-link>
          <span
            class="text-white inline-block px-2 py-1 rounded shadow-sm flex items-center gap-2"
            style="background-color: #ff6600"
          >
            <img
              src="https://news.ycombinator.com/y18.svg"
              class="w-5 h-5 border-white border"
            >
            Hacker News
          </span>
        </h1>
      </div>

      <a
        href="https://github.com/bkeepers/readable.news"
        title="Contribute on GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="w-6 h-6 text-gray-500"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
      </a>
      <Menu class="">
        <template #button>
          <FeedIcon class="w-6 h-6 text-orange-500 hover:text-orange-600 bg-white rounded" />
        </template>
        <template #items>
          <MenuItem
            v-for="(href, title) in feed.formats"
            :key="href"
            class="block text-sm"
          >
            <a
              :href="href"
              class="group flex w-full items-center rounded-md px-4 py-2 text-sm"
            >
              {{ title }}
            </a>
          </MenuItem>
        </template>
      </Menu>
    </div>
  </div>
</template>
