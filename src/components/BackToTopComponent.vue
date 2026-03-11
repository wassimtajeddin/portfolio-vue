<template>
  <button 
    v-show="isVisible" 
    @click="scrollToTop" 
    class="back-to-top"
    aria-label="Back to top"
  >
    <i class="fas fa-chevron-up"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Button visibility state
const isVisible = ref(false)

// Show button when scrolled down 300px
const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

// Smooth scroll to top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Add scroll listener on mount
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// Remove scroll listener on unmount
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 212, 170, 0.5);
}

@media (max-width: 768px) {
.back-to-top {
bottom: 4rem;
}

}

</style>