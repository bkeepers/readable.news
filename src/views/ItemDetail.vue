<script setup>
import { useFeedStore } from '../stores/feed.js'
import Nav from '../components/Nav.vue'
import Reader from '../components/Reader.vue'

const props = defineProps({
  id: String
})

const item = useFeedStore().find(props.id)
</script>

<template>
  <div>
    <Nav />
    <Reader
      v-if="item"
      :item="item"
    />
  </div>
</template>
