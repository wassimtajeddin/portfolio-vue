<template>
  <div class="scroll-progress" :style="{ width: progress + '%' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Scroll progress percentage
const progress = ref(0)

// Calculate scroll progress as percentage
const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = (scrollTop / docHeight) * 100
}

// Add scroll listener on mount
onMounted(() => {
  window.addEventListener('scroll', updateProgress)
})

// Remove scroll listener on unmount
onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color), #00e6b8);
  z-index: 1001;
  transition: width 0.1s ease;
}
</style>