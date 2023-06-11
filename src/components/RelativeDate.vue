<script>
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

try {
  TimeAgo.addDefaultLocale(en)
} catch {
  // ignore error when this module is reloaded
}

const timeAgo = new TimeAgo('en-US')
</script>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  value: String
})

const date = computed(() => Date.parse(props.value))
</script>

<template>
  <time :datetime="value" :title="value">{{ timeAgo.format(date, 'mini-minute') }}</time>
</template>
