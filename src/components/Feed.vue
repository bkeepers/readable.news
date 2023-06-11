<script setup>
import Item from "./Item.vue"
import { useFeedStore } from '../stores/feed.js'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

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
    <div class="flex place-items-center gap-3 mb-6">
      <h1 class="font-bold grow flex gap-3 align-items-middle">
        <span class="text-3xl text-black dark:text-white">Readable</span>
        <span class="text-xl text-white inline-block px-2 py-1 rounded shadow-sm flex items-center gap-2" style="background-color: #ff6600">
          <img src="https://news.ycombinator.com/y18.svg" class="w-5 h-5 border-white border" />
          Hacker News
        </span>
      </h1>

      <div>
        <form method="GET">
          <select name="period" class="select select-bordered select-sm" v-model="feed.params.period">
            <option v-for="period in periods">{{ period }}</option>
          </select>
        </form>
      </div>

      <Menu as="div" class="relative inline-block text-left">
        <MenuButton
          class="rounded text-orange-500 hover:text-orange-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-rss-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1 0-2zm0 4a6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1 0-2zm.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </MenuButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <MenuItem v-for="(href, title) in formats">
              <a :href="href" class="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                {{ title }}
              </a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Item v-for="item in feed.items" v-bind="item" />
    </div>
  </div>
</template>
