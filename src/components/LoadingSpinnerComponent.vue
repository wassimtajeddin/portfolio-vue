<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
      <div class="dot3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped>
</style>