<script setup>
import { useFeedStore } from '../stores/feed.js'
import Reader from '../components/Reader.vue'

const props = defineProps({
  id: String
})

const item = useFeedStore().find(props.id)
</script>

<template>
  <Reader v-if="item" :item="item" />
</template>
