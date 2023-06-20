<script setup>
import Item from "./Item.vue"
import Menu from "./Menu.vue"
import FeedIcon from "./FeedIcon.vue"
import { MenuItem } from '@headlessui/vue'
import { useFeedStore } from '../stores/feed.js'

const periods = ["24h", "3d", "1w", "30d", "1y"]
const feed = useFeedStore()
</script>

<template>
  <div>
    <div class="flex place-items-center gap-3 mb-12 flex-wrap">
      <div class="grow">
        <h1 class="font-bold flex gap-3 align-items-middle">
          <span class="text-3xl lg:text-4xl text-black dark:text-white">Readable</span>
          <span class="text-xl text-white inline-block px-2 py-1 rounded shadow-sm flex items-center gap-2" style="background-color: #ff6600">
            <img src="https://news.ycombinator.com/y18.svg" class="w-5 h-5 border-white border" />
            Hacker News
          </span>
        </h1>
      </div>
      <Menu class="">
        <template v-slot:button>
          <FeedIcon width="34" height="34" class="text-orange-500 hover:text-orange-600 bg-white rounded" />
        </template>
        <template v-slot:items>
          <MenuItem v-for="(href, title) in feed.formats" class="block text-sm">
            <a :href="href" class="group flex w-full items-center rounded-md px-4 py-2 text-sm">
              {{ title }}
            </a>
          </MenuItem>
        </template>
      </Menu>
    </div>

    <div class="flex gap-3 place-items-center">
      <h2 class="text-4xl font-extrabold text-slate-500 mb-2 grow">
        {{ new Date().toLocaleDateString('en-us', { month: "long", day: "numeric" }) }}
      </h2>
      <form method="GET">
        <select name="period" v-model="feed.params.period" class="border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
          <option v-for="period in periods">{{ period }}</option>
        </select>
      </form>
    </div>
    <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Item v-for="item in feed.items" :key="item.id" v-bind="item" />
      <template v-if="feed.isFetching">
        <Item v-for="i in 12" :key="i" skeleton :style="`animation-delay: ${Math.floor(Math.random() * 400)}ms;`" />
      </template>
    </div>
  </div>
</template>
