<script>
import { computed } from 'vue'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

try {
  TimeAgo.addDefaultLocale(en)
} catch {
  // ignore error when this module is reloaded
}
</script>

<script setup>
const timeAgo = new TimeAgo('en-US')
const props = defineProps({
  value: String
})

const date = computed(() => Date.parse(props.value))
</script>

<template>
  <time
    :datetime="value"
    :title="value"
  >{{ timeAgo.format(date, 'mini-minute') }}</time>
</template>
