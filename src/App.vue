<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
    <button 
      v-show="showScrollTop" 
      @click="scrollToTop"
      class="scroll-to-top"
      :class="{ visible: showScrollTop }"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import "@/assets/style.css"
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const showScrollTop = ref(false)

function handleScroll() {
  showScrollTop.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: calc(30px + env(safe-area-inset-bottom));
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--accent-color);
  color: black;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-to-top.visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 212, 170, 0.4);
}
</style>
