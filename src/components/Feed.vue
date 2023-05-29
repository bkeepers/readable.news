<script setup>
import storify from "../storify.js"
const items = await storify()
</script>

<template>
  <div>
    <h1>Stories</h1>
    <div v-for="item in items">
      <a :href="item.url">{{ item.title }}</a>
      <a :href="item.external_url">(Comments)</a>
      {{ item.date_published }}
    </div>
  </div>
</template>
