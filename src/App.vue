<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div :class="{
    'container-xl mx-auto p-8 min-h-screen': true,
    'bg-slate-100 dark:bg-slate-900 dark:text-slate-200': route.meta.bg !== 'white',
    'bg-white dark:bg-slate-900 dark:text-slate-200': route.meta.bg === 'white'
  }">
    <Suspense>
      <router-view></router-view>
    </Suspense>
  </div>
</template>
