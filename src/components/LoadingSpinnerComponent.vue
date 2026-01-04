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
  .back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: var(--accent-color);
  color: black;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 212, 170, 0.5);
}

@media (max-width: 768px) {
.back-to-top {
  bottom: 1rem;
  right: 1rem;
  width: 45px;
  height: 45px;
}
}
</style>