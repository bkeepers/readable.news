<script setup>
import Item from './Item.vue'
import { useFeedStore } from '../stores/feed.js'

const periods = ['24h', '3d', '1w', '30d', '1y']
const feed = useFeedStore()
</script>

<template>
  <div>
    <div class="flex gap-3 place-items-center">
      <h2 class="text-4xl font-extrabold text-slate-500 mb-2 grow">
        {{ new Date().toLocaleDateString('en-us', { month: "long", day: "numeric" }) }}
      </h2>
      <form method="GET">
        <select
          v-model="feed.params.period"
          name="period"
          class="border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        >
          <option
            v-for="period in periods"
            :key="period"
          >
            {{ period }}
          </option>
        </select>
      </form>
    </div>
    <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Item
        v-for="item in feed.items"
        :key="item.id"
        v-bind="item"
      />
      <template v-if="feed.isFetching">
        <Item
          v-for="i in 12"
          :key="i"
          skeleton
          :style="`animation-delay: ${Math.floor(Math.random() * 400)}ms;`"
        />
      </template>
    </div>
  </div>
</template>
