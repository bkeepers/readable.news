<script setup>
import Item from "./Item.vue"
import Menu from "./Menu.vue"
import { MenuItem } from '@headlessui/vue'
import { useFeedStore } from '../stores/feed.js'

const formats = {
  "JSON Feed": "/api/feed",
  "RSS": "/api/feed?format=rss",
  "Atom": "/api/feed?format=atom",
}

const periods = ["24h", "3d", "1w", "30d", "1y"]
const feed = useFeedStore()
</script>

<template>
  <div>
    <div class="flex place-items-center gap-3 mb-8 flex-wrap">
      <h1 class="order-1 font-bold flex gap-3 align-items-middle grow">
        <span class="text-3xl text-black dark:text-white">Readable</span>
        <span class="text-xl text-white inline-block px-2 py-1 rounded shadow-sm flex items-center gap-2" style="background-color: #ff6600">
          <img src="https://news.ycombinator.com/y18.svg" class="w-5 h-5 border-white border" />
          Hacker News
        </span>
      </h1>

      <form method="GET" class="order-last w-full md:w-auto md:order-2">
        <select name="period" v-model="feed.params.period" class="border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
          <option v-for="period in periods">{{ period }}</option>
        </select>
      </form>
      <Menu class="order-3">
        <template v-slot:button>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="text-orange-500 hover:text-orange-600 bg-white rounded" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1 0-2zm0 4a6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1 0-2zm.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </template>
        <template v-slot:items>
          <MenuItem v-for="(href, title) in formats" class="block text-sm">
            <a :href="href" class="group flex w-full items-center rounded-md px-4 py-2 text-sm">
              {{ title }}
            </a>
          </MenuItem>
        </template>
      </Menu>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Item v-for="item in feed.items" v-bind="item" />
    </div>
  </div>
</template>
