<script setup>
import Menu from "./Menu.vue"
import FeedIcon from "./FeedIcon.vue"
import { MenuItem } from '@headlessui/vue'

import { useFeedStore } from '../stores/feed.js'
const feed = useFeedStore()
</script>

<template>
  <div class="sticky border-b bg-white/80 backdrop-blur-lg backdrop-brightness-150 top-0 left-0 right-0 shadow">
    <div class="container-xl mx-auto p-4 md:px-8 lg:px-16 flex place-items-center gap-3 flex-wrap">
      <div class="grow">
        <h1 class="font-bold flex gap-3 align-items-middle">
          <router-link to="/" class="text-xl lg:text-2xl text-black dark:text-white">Readable</router-link>
          <span class="text-white inline-block px-2 py-1 rounded shadow-sm flex items-center gap-2" style="background-color: #ff6600">
            <img src="https://news.ycombinator.com/y18.svg" class="w-5 h-5 border-white border" />
            Hacker News
          </span>
        </h1>
      </div>
      <Menu class="">
        <template v-slot:button>
          <FeedIcon class="w-6 h-6 text-orange-500 hover:text-orange-600 bg-white rounded" />
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
  </div>
</template>
