<template>
  <div class="skeleton" :style="{ width, height, borderRadius }"></div>
</template>

<script setup>
// Reusable skeleton block — accepts width, height and borderRadius as props
defineProps({
  width:  { type: String, default: '100%' },
  height: { type: String, default: '1rem' },
  borderRadius: { type: String, default: '6px' }
})
</script>

<style scoped>
.skeleton {
  background: linear-gradient(90deg, var(--secondary-color) 25%, rgba(0,212,170,0.08) 50%, var(--secondary-color) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
