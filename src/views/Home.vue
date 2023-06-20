<script setup>
import Nav from '../components/Nav.vue'
import Welcome from '../components/Welcome.vue'
import Feed from '../components/Feed.vue'
</script>

<template>
  <div class="relative">
    <Nav />
    <Welcome />
    <Feed class="container-xl mx-auto p-4 md:p-8 lg:p-16" />
  </div>
</template>
